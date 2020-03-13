<template>
  <oy-page>
    <oy-page-header>
      <div slot="actions">
        <oy-button
          title="Добавить"
          type="success"
          :svgIcon="'AddIcon'"
          @click="showModal"
        ></oy-button>
        <oy-modal
          title="Добавить зону"
          padding="1rem"
          :visible="set_new_spot"
          @close="set_new_spot = false"
        >
          <storeSpot :company_id="Number(company_id)"/>
        </oy-modal>
      </div>
    </oy-page-header>
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
            <voucherIcon v-show="spot.type===3" :color="'#f04641'"/>
            <nuxt-link
              :to="{ name: 'dashboard-company-id-spots-sid-mainSpot', params: { id:company_id, sid: spot.id } }">
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
    <nuxt-child/>
  </oy-page>
</template>

<script>
  import storeSpot from "@/components/dashboard/company/modals/storeSpot";
  import spotIcon from "@/components/icons/spotIcon";
  import smsIcon from "@/components/icons/smsIcon";
  import callIcon from "@/components/icons/callIcon";
  import voucherIcon from "@/components/icons/voucherIcon";
  export default {
    components: {spotIcon, storeSpot, smsIcon, callIcon, voucherIcon},
    data() {
      return {
        company_id: this.$route.params.id
      }
    },
    methods: {
      showModal() {
        this.$store.dispatch('users/getTypes');
        return this.set_new_spot = true;
      },
    },
    computed: {
      spots: function () {
        return this.$store.getters['company/spots']
      },
      set_new_spot: {
        get: function () {
          return this.$store.getters['app/set_new_spot'];
        },
        set: function (value) {
          this.$store.commit('app/SET_NEW_SPOT', value);
        }
      },
    },
    mounted() {
      this.$store.dispatch('company/getSpots', this.company_id)
    }
  }
</script>

<style scoped>

</style>
