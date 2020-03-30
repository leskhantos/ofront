<template>
    <oy-page>
      <oy-page-body>
      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col">Зона</th>
          <th scope="col">Страница</th>
          <th scope="col" style="text-align: center">Последняя активность</th>
          <th scope="col"></th>

        </tr>
        </thead>
        <tbody v-if="spots">
        <tr v-for="spot in spots" :key="spot.id">
          <td>
            <smsIcon v-show="spot.type===1" :color="'#f04641'"/>
            <callIcon v-show="spot.type===2" :color="'#f04641'"/>
            <voucherIcon v-show="spot.type===3" :color="'#f04641'" width="24px" height="24px"/>
            <nuxt-link
              :to="{ name: 'dashboard-company-id-spots-sid-statistics', params: { id: company_id, sid: spot.id } }">
              {{spot.address }}
            </nuxt-link>
          </td>
          <td>{{ spot.page_name }}</td>
          <td style="text-align: center">{{ spot.last_active? spot.last_active: 'нет данных'}}</td>
          <td style="text-align: right">
            <oy-dot :active-color="spot.enabled ? '#37a967': 'red'"/>
          </td>
        </tr>
        <tr v-if="!spots.length" class="no-data text-center">
          <td colspan="14">Нет данных</td>
        </tr>
        </tbody>
      </table>
      </oy-page-body>
    </oy-page>
</template>

<script>
  import smsIcon from "@/components/icons/smsIcon";
  import callIcon from "@/components/icons/callIcon";
  import voucherIcon from "@/components/icons/voucherIcon";
    export default {
      components: {smsIcon, callIcon, voucherIcon},
      name: "spot",
      layout:'dashboard',
      data(){
        return{
          company_id: this.$route.params.cabinet
        }
      },
      async asyncData ({ store, route }) {
        await store.dispatch('spot/getSpotsByCompany', route.params.cabinet);
        return {}
      },
      computed: {
        spots: function () {
          return this.$store.getters['spot/spotsByCompany']
        },
      },
    }
</script>

<style lang="scss" scoped>

</style>
