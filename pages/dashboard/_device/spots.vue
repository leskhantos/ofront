<template>
  <table class="table table-striped">
    <thead>
    <tr>
      <th scope="col">Дата и время</th>
      <th scope="col">Компания / Зона</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="spot in spotList">
      <td data-label="Дата и время">{{ spot.created }}</td>
      <td data-label="Компания / Зона">{{ spot.name + ' / ' + spot.address }}</td>
    </tr>
    <tr v-if="!spotList.length" class="no-data text-center">
      <td colspan="14">Нет данных</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
    export default {
        name: "spots",
      computed: {
          spotList: function(){
            return this.$store.getters['device/deviceSpots']
          }
      }
    }
</script>

<style scoped>

</style>
