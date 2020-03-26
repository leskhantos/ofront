<template>
  <oy-page>
    <div class="d-flex">
      <div class="d-flex mr-auto" >
      <oy-button  buttonType="submit"
                  type="submit"
                  class="btn btn-success"
                  :block="true"
                  title="Активировать"
                  :svgIcon="'activateIcon'"
                  @click="showModal"
      />
        <oy-modal
          title="Активировать ваучер"
          padding="1rem"
          :visible="activate_voucher"
          @close="activate_voucher = false"
        >
          <activate-voucher :spot_id="Number(this.spot_id)"/>
        </oy-modal>
      </div>
      <div class="d-flex ml-auto">
        <oy-select
          @childToParent="onChange"
          :options="types"
          :selected="type"
          v-model="type"
        />
      </div>
    </div>
    <oy-page-body>
      <table  class="table table-striped">
        <thead>
        <tr>
          <th>ID</th>
          <th>Номер комнаты</th>
          <th>Начало действия</th>
          <th>Окончание действия</th>
          <th>Использований</th>
        </tr>
        </thead>
        <tbody v-if="dataList">
        <tr v-for="voucher in dataList">
          <td>{{voucher.id}}</td>
          <td>{{voucher.room}}</td>
          <td>{{voucher.dt_start}}</td>
          <td>{{voucher.dt_end}}</td>
          <td>{{voucher.can_used}}</td>
        </tr>
        <tr v-if="!dataList.length" class="no-data text-center">
          <td colspan="14">Нет данных</td>
        </tr>
        </tbody>
      </table>
    </oy-page-body>
  </oy-page>
</template>

<script>

  import ActivateVoucher from "@/components/dashboard/company/modals/activateVoucher";
  export default {
        name: "voucher",
    components: {ActivateVoucher},
    data() {
      return {
        spot_id: this.$route.params.sid,
        type: 1,
        types:[
          {id: 1, name:'Активные'},
          {id: 2, name:'Использованные'},
        ]
      }
    },
    methods: {
      onChange(val) {
        this.type = val
      },
      showModal() {
        return this.activate_voucher = true;
      },
    },
    computed: {
      dataList() {
         return this.$store.getters['voucher/vouchers']
      },
      activate_voucher: {
        get: function () {
          return this.$store.getters['app/activate_voucher'];
        },
        set: function (value) {
          this.$store.commit('app/ACTIVATE_VOUCHER', value);
        }
      },
    },
    created() {
      this.$store.dispatch('voucher/getVouchers', {spot_id: this.$route.params.sid,activity:1});
    },
    watch: {
          type: {
            immediate: false,
            handler() {
              const activity = Number(this.type)
              let payload = {
                spot_id: this.spot_id,
                activity: activity
              }
              this.$store.dispatch('voucher/getVouchers', payload);
            }
          }
    }
    }
</script>

<style scoped>

</style>
