<template>
  <oy-page>
    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col">Страница</th>
        <th scope="col">Зона</th>
      </tr>
      </thead>
      <tbody v-if="styles">
      <tr v-for="style in styles" :key="style.id">
        <td>
          <smsIcon v-show="style.type===1" :color="'#f04641'"/>
          <callIcon v-show="style.type===2" :color="'#f04641'"/>
          <voucherIcon v-show="style.type===3" :color="'#f04641'" width="24px" height="24px"/>
          {{ style.name }}</td>
        <td >{{ style.spot }}</td>
      </tr>
      <tr v-if="!styles.length" class="no-data text-center">
        <td colspan="14">Нет данных</td>
      </tr>
      </tbody>
    </table>

  </oy-page>
</template>

<script>
  import smsIcon from "@/components/icons/smsIcon";
  import callIcon from "@/components/icons/callIcon";
  import voucherIcon from "@/components/icons/voucherIcon";
    export default {
      components: {smsIcon,callIcon,voucherIcon},
      name: "style",
      layout:'dashboard',
      async asyncData ({ store, route }) {
        await store.dispatch('company/getStyles', route.params.cabinet);
        return {}
      },
      computed: {
        styles: function () {
          return this.$store.getters['company/styles']
        },
      },
    }
</script>

<style scoped>

</style>
