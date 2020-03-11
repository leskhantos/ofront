<template>
  <oy-page>
    <div class="d-flex flex-wrap flex-column justify-content-start">
      <device-data title="Последняя сессия:" :text="device.last_session"/>
      <device-data title="Последняя зона:" :text="device.name +' / '+ device.address"/>
      <device-data title="Разрешение экрана:" :text="device.screen_w + 'x' + device.screen_h"/>
      <device-data title="Трафик за текущий месяц (входящий / исходящий): " :text="device.bytes_in? device.bytes_in: '-' + ' / ' + device.bytes_out? device.bytes_out:'-'"/>
      <device-data title="Сессий авторизаций:" :text="device.count_auth"/>
      <device-data title="Завершенных сессий:" :text="device.count_finished ? device.count_finished : 'нет данных'"/>
    </div>
  </oy-page>
</template>

<script>
  import DeviceData from "@/components/dashboard/device/deviceData";

  export default {
    name: "mainDevice",
    components: {DeviceData},
    computed: {
      device: function(){
        return this.$store.getters['device/deviceData']
      }
    },
      created(){
          this.$store.dispatch("device/getDeviceData", this.$route.params.device);
      }
    }
</script>

<style scoped>

</style>
