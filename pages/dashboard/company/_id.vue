<template>
  <div class="company-page">
    <portal to="company-nav">
      <nav class="nav nav-pills nav-fill" v-show="showOnly">
        <div class="nav-item nav-link border-right border-top border-bottom rounded-0" :class="{active: isActive('main')}" @click="switchComponents('main')">
          Основное
        </div>
        <div class="nav-item nav-link border-right border-top border-bottom rounded-0" :class="{active: isActive('guests')}" @click="switchComponents('guests')">
          Гости
        </div>
        <div class="nav-item nav-link border-right border-top border-bottom rounded-0" :class="{active: isActive('spots')}" @click="switchComponents('spots')">
          Зоны
        </div>
        <div class="nav-item nav-link border-right border-top border-bottom rounded-0" :class="{active: isActive('styles')}" @click="switchComponents('styles')">
          Стили
        </div>
        <div class="nav-item nav-link border-right border-top border-bottom rounded-0" :class="{active: isActive('accounts')}"
             @click="switchComponents('accounts')">
          Аккаунты
        </div>
        <div class="nav-item nav-link border-top border-bottom rounded-0" :class="{active: isActive('control')}" @click="switchComponents('control')">
          Управление
        </div>
      </nav>
    </portal>
    <nuxt-child />
  </div>
</template>

<script>
  import { Portal } from 'portal-vue'

  export default {
    layout: "dashboard",
    components: {Portal},
    data() {
      return {
        isActiveItem: 'main',
        company_id: this.$route.params.id
      }
    },
    computed: {
      showOnly() {
        return !this.$route.params.sid;
      },
    },
    validate({params}) {
      return /^\d+$/.test(params.id)
    },
    metaInfo() {
      return {
        titleTemplate: `%s | ${this.company.name}`
      };
    },
    created() {
      let date = new Date();
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      let data = {
        month: month,
        year: year,
        company_id: this.$route.params.id
      }
      this.$store.dispatch('statistics/getAllByCompanyPerMonth', data);
      this.$store.dispatch('statistics/getAllDataByCompany', data);
      this.$store.dispatch('spot/getSpotsByCompany', this.$route.params.id);
      this.$store.dispatch("company/getCompany", this.$route.params.id);
    },
    methods: {
      switchComponents(item) {
        this.isActiveItem = item;
        switch (item) {
          case 'guests':
            this.$router.push({name: 'dashboard-company-id-guests', params: {id: this.company_id}})
            break;
          case 'spots':
            this.$router.push({name: 'dashboard-company-id-spots', params: {id: this.company_id}})
            break;
          case 'styles':
            this.$router.push({name: 'dashboard-company-id-styles', params: {id: this.company_id}})
            break;
          case 'accounts':
            this.$router.push({name: 'dashboard-company-id-accounts', params: {id: this.company_id}})
            break;
          case 'control':
            this.$router.push({name: 'dashboard-company-id-control', params: {id: this.company_id}})
            break;
          default:
            this.$router.push({name: 'dashboard-company-id-main', params: {id: this.company_id}})
            break;
        }
      },

      isActive: function (menuItem) {
        switch (this.$route.name) {
          case 'dashboard-company-id-control':
            this.isActiveItem = 'control';
            break;
          case 'dashboard-company-id-guests':
            this.isActiveItem = 'guests';
            break;
          case 'dashboard-company-id-spots':
            this.isActiveItem = 'spots';
            break;
          case 'dashboard-company-id-styles':
            this.isActiveItem = 'styles';
            break;
          case 'dashboard-company-id-accounts':
            this.isActiveItem = 'accounts';
            break;
          default:
            this.isActiveItem = 'main';
            break;
        }
        return this.isActiveItem === menuItem
      }
    }
  };
</script>
<style lang="scss" scoped>
  .company-page {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    &__title {
      margin-top: .5rem;
      margin-right: .1rem;
      margin-left: .1rem;
    }

    &::-webkit-scrollbar {
      width: 0.3rem;
    }

    &::-webkit-scrollbar-track {
      background-color: rgba(0, 0, 0, 0.15);
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.15);
    }
  }
  .nav-item {
    border-radius: 0;
    background-color: #ffffff;
    &:hover{
      cursor: pointer;
    }
  }
  .active{
    background-color: #575962 !important;
    border: 1px!important;
  }
</style>
