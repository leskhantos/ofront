<template>
  <div class="spot-page">
    <portal to="spot-nav">
    <nav class="nav nav-pills nav-fill">
      <div v-if="user.type!=='client'" class="nav-item nav-link border-right border-top border-bottom rounded-0" :class="{active: isActive('mainSpot')}"
           @click="switchComponents('mainSpot')">
        Основное
      </div>
      <div class="nav-item nav-link border-right border-top border-bottom rounded-0" :class="{active: isActive('statistics')}"
           @click="switchComponents('statistics')">
        Статистика
      </div>
      <div class="nav-item nav-link border-right border-top border-bottom rounded-0" :class="{active: isActive('guests')}" @click="switchComponents('guests')">
        Гости
      </div>
      <div class="nav-item nav-link border-right border-top border-bottom rounded-0" :class="{active: isActive('sessions')}"
           @click="switchComponents('sessions')">
        Сессии
      </div>
      <div class="nav-item nav-link border-right border-top border-bottom rounded-0" :class="{active: isActive('actions')}" @click="switchComponents('actions')">
        События
      </div>
      <div v-show="this.spot.type===3" class="nav-item nav-link border-right border-top border-bottom rounded-0" :class="{active: isActive('list')}" @click="switchComponents('list')">
        Листы
      </div>
      <div v-show="this.spot.type===3" class="nav-item nav-link border-right border-top border-bottom rounded-0" :class="{active: isActive('voucher')}" @click="switchComponents('voucher')">
        Ваучеры
      </div>
      <div v-show="this.spot.type===1 || this.spot.type===2" class="nav-item nav-link  border-top border-bottom rounded-0" :class="{active: isActive('mutable')}" @click="switchComponents('mutable')">
        {{ changeableNav }}
      </div>
    </nav>
    </portal>
    <nuxt-child/>
  </div>
</template>

<script>
  import { Portal } from 'portal-vue'

  export default {
    data() {
      return {
        isActiveItem: 'mainSpot',
      }
    },
    components: {Portal},
    created() {
      this.$store.dispatch('spot/getSpot', this.$route.params.sid);
    },
    computed:{
      spot: function () {
        return this.$store.getters['spot/spot']
      },
      changeableNav(){
        if (this.spot.type===1){
          return 'SMS';
        }else if(this.spot.type===2){
          return 'Звонки'
        }
      },
      user: function () {
        return this.$store.getters['users/user']
      }
    },
    methods: {
      switchComponents(item) {
        this.isActiveItem = item;
        switch (item) {
          case 'statistics':
            this.$router.push({
              name: 'dashboard-company-id-spots-sid-statistics',
              params: {id: this.$route.params.id, sid: this.$route.params.sid}
            })
            break;
          case 'guests':
            this.$router.push({
              name: 'dashboard-company-id-spots-sid-guests',
              params: {id: this.$route.params.id, sid: this.$route.params.sid}
            })
            break;
          case 'sessions':
            this.$router.push({
              name: 'dashboard-company-id-spots-sid-sessions',
              params: {id: this.$route.params.id, sid: this.$route.params.sid}
            })
            break;
          case 'actions':
            this.$router.push({
              name: 'dashboard-company-id-spots-sid-actions',
              params: {id: this.$route.params.id, sid: this.$route.params.sid}
            })
            break;
          case 'list':
            this.$router.push({
              name: 'dashboard-company-id-spots-sid-list',
              params: {id: this.$route.params.id, sid: this.$route.params.sid}
            })
            break;
            case 'voucher':
            this.$router.push({
              name: 'dashboard-company-id-spots-sid-voucher',
              params: {id: this.$route.params.id, sid: this.$route.params.sid}
            })
            break;
          case 'mutable':
            this.$router.push({
              name: 'dashboard-company-id-spots-sid-mutable',
              params: {id: this.$route.params.id, sid: this.$route.params.sid}
            })
            break;
          default:
            this.$router.push({
              name: 'dashboard-company-id-spots-sid-mainSpot',
              params: {id: this.$route.params.id, sid: this.$route.params.sid}
            })
            break;
        }
      },

      isActive: function (menuItem) {
        switch (this.$route.name) {
          case 'dashboard-company-id-spots-sid-statistics':
            this.isActiveItem = 'statistics';
            break;
          case 'dashboard-company-id-spots-sid-guests':
            this.isActiveItem = 'guests';
            break;
          case 'dashboard-company-id-spots-sid-sessions':
            this.isActiveItem = 'sessions';
            break;
          case 'dashboard-company-id-spots-sid-actions':
            this.isActiveItem = 'actions';
            break;
          case 'dashboard-company-id-spots-sid-list':
            this.isActiveItem = 'list';
            break;
          case 'dashboard-company-id-spots-sid-voucher':
            this.isActiveItem = 'voucher';
            break;
          case 'dashboard-company-id-spots-sid-mutable':
            this.isActiveItem = 'mutable';
            break;
          default:
            this.isActiveItem = 'mainSpot';
            break;
        }
        return this.isActiveItem === menuItem
      }
    }
  }
</script>

<style lang="scss" scoped>
  .spot-page {
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
  .nav-item{
    border-radius: 0;
    background-color: #ffffff;
    &:hover{
      cursor: pointer;
    }
  }
  .active {
    background-color: #575962 !important;
    border: 1px!important;
  }
</style>
