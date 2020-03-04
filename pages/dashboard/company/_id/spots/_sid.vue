<template>
  <div class="spot-page">
    <nav class="nav nav-pills nav-fill">
      <div class="nav-item nav-link border" :class="{active: isActive('mainSpot')}"
           @click="switchComponents('mainSpot')">
        Основное
      </div>
      <div class="nav-item nav-link border" :class="{active: isActive('statistics')}"
           @click="switchComponents('statistics')">
        Статистика
      </div>
      <div class="nav-item nav-link border" :class="{active: isActive('guests')}" @click="switchComponents('guests')">
        Гости
      </div>
      <div class="nav-item nav-link border" :class="{active: isActive('sessions')}"
           @click="switchComponents('sessions')">
        Сессии
      </div>
      <div class="nav-item nav-link border" :class="{active: isActive('actions')}" @click="switchComponents('actions')">
        События
      </div>
      <div class="nav-item nav-link border" :class="{active: isActive('mutable')}" @click="switchComponents('mutable')">
        Звонки
      </div>
    </nav>
    <nuxt-child/>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isActiveItem: 'mainSpot',
      }
    },
    created() {
      this.$store.dispatch('spot/getSpot', this.$route.params.sid);
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

    .active {
      background-color: #575962;
    }
  }
</style>
