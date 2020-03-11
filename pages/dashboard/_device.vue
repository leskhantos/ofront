<template>
  <oy-page class="device-page">
    <div class="card">
      <div class="card-header">
        Основная информация
      </div>
      <div class="card-body d-flex flex-wrap justify-content-around">
        <device-data title="MAC:" :text="device.mac"/>
        <device-data title="Создан:" :text="device.created"/>
        <device-data title="Последний онлайн:" :text="device.last_online"/>
        <device-data title="Всего сессий:" :text="device.sessions"/>
        <device-data title="Тип:" :text="device.type"/>
        <device-data title="ОС:" :text="device.os"/>
        <device-data title="Версия ОС:" :text="device.os_version"/>
      </div>
    </div>
    <nav class="nav nav-pills nav-fill">
      <div class="nav-item nav-link border-bottom border-right border-left" :class="{active: isActive('main')}" @click="switchComponents('main')">
        Основное
      </div>
      <div class="nav-item nav-link border-bottom border-right border-left" :class="{active: isActive('spots')}" @click="switchComponents('spots')">
        Зоны
      </div>
      <div class="nav-item nav-link border-bottom border-right border-left" :class="{active: isActive('sessions')}" @click="switchComponents('sessions')">
        Сессии
      </div>
      <div class="nav-item nav-link border-bottom border-right border-left" :class="{active: isActive('numbers')}"
           @click="switchComponents('numbers')">
        Номера
      </div>
      <div class="nav-item nav-link border-bottom border-right border-left" :class="{active: isActive('actions')}" @click="switchComponents('actions')">
        События
      </div>
    </nav>
    <nuxt-child />
  </oy-page>
</template>

<script>
    import DeviceData from "@/components/dashboard/device/deviceData";
    export default {
        name: "device",
      components: {DeviceData},
      layout: "dashboard",
      data() {
        return {
          isActiveItem: 'main',
          device_id: this.$route.params.device
        }
      },
      computed: {
          device:function(){
            return this.$store.getters['device/device']
          }
      },
      created() {
        this.$store.dispatch("device/getDevice", this.$route.params.device);
        this.$store.dispatch("device/getDeviceSpots", this.$route.params.device);
      },
      methods: {
        switchComponents(item) {
          this.isActiveItem = item;
          switch (item) {
            case 'actions':
              this.$router.push({name: 'dashboard-device-actions', params: {device: this.device_id}})
              break;
            case 'numbers':
              this.$router.push({name: 'dashboard-device-numbers', params: {device: this.device_id}})
              break;
            case 'sessions':
              this.$router.push({name: 'dashboard-device-sessions', params: {device: this.device_id}})
              break;
            case 'spots':
              this.$router.push({name: 'dashboard-device-spots', params: {device: this.device_id}})
              break;
            default:
              this.$router.push({name: 'dashboard-device-mainDevice', params: {device: this.device_id}})
              break;
          }
        },

        isActive: function (menuItem) {
          switch (this.$route.name) {
            case 'dashboard-device-actions':
              this.isActiveItem = 'actions';
              break;
            case 'dashboard-device-numbers':
              this.isActiveItem = 'numbers';
              break;
            case 'dashboard-device-spots':
              this.isActiveItem = 'spots';
              break;
            case 'dashboard-device-sessions':
              this.isActiveItem = 'sessions';
              break;
            default:
              this.isActiveItem = 'main';
              break;
          }
          return this.isActiveItem === menuItem
        }
      }
    }
</script>

<style lang="scss" scoped>
  .device-page .active{
    background-color: #575962;
  }
</style>
