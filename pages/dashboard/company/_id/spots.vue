<template>
  <oy-page>
    <oy-page-header>
      <div slot="actions">
        <oy-button
          title="Добавить зону"
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
          <storeSpot :company_id="company_id"/>
        </oy-modal>
      </div>
    </oy-page-header>
    <oy-page-body :style="{ borderBottom: '1px solid rgba(0,0,0,.1)' }">
      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col">Зона</th>
          <th scope="col">Страница</th>
          <th scope="col">Последняя активность</th>
          <th scope="col"></th>

        </tr>
        </thead>
        <tbody>
        <tr v-for="spot in spots" :key="spot.id">
          <td>
            <spot-icon/>
            <nuxt-link :to="{ name: 'dashboard-company-id-spot-sid', params: { sid: spot.id } }">{{spot.address }}</nuxt-link>
          </td>
          <td>{{ spot.page_name }}</td>
          <td>{{ spot.last_active }}</td>
          <td style="text-align: right">
            <oy-dot :active-color="spot.enabled ? '#37a967': 'red'"/>
          </td>
        </tr>
        </tbody>
      </table>
    </oy-page-body>
  </oy-page>
</template>

<script>
  import storeSpot from "../../../../components/dashboard/company/modals/storeSpot";
  import spotIcon from "../../../../components/icons/spotIcon";
    export default {
      components: {spotIcon, storeSpot},
      data(){
        return{
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
