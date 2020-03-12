<template>
  <table class="table table-striped" :style="{marginTop:'2rem'}">
    <thead>
    <tr>
      <th scope="col">Дата и время</th>
      <th scope="col">Номер</th>
    </tr>
    </thead>
    <tbody v-if="phoneList">
    <tr v-for="phone in phoneList">
      <td data-label="Дата и время">{{ phone.created }}</td>
      <td data-label="Номер">{{ phone.phone}}</td>
    </tr>
    <tr v-if="!phoneList.length" class="no-data text-center">
      <td colspan="14">Нет данных</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
    export default {
        name: "numbers",
      computed: {
        phoneList: function(){
          return this.$store.getters['device/devicePhones']
        }
      },
      created(){
        this.$store.dispatch("device/getDevicePhones", this.$route.params.device);
      }
    }
</script>

<style scoped>

</style>
