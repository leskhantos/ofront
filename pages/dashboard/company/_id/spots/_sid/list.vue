<template>
  <oy-page>
    <div class="d-flex">
      <div class="d-flex mr-auto">
        <oy-button :style="{marginBottom:'1.2rem', width:'12rem'}" buttonType="submit"
                   type="submit"
                   class="btn btn-success"
                   :block="true"
                   title="Сгенерировать"
                   :svgIcon="'generateIcon'"
                   @click="generate"
        />
      </div>
    </div>
    <oy-page-body>
      <table  class="table table-striped">
        <thead>
        <tr>
          <th>Дата генерации</th>
          <th>Активированы</th>
          <th>Использованы</th>
          <th>Доступные</th>
          <th></th>
        </tr>
        </thead>
        <tbody v-if="lists">
        <tr v-for="list in lists">
          <td>{{list.created}}</td>
          <td>{{list.active}}</td>
          <td>{{list.used}}</td>
          <td>{{list.inactive}}</td>
          <td>
            <oy-button :style="{marginBottom:'1.2rem', width:'10rem'}" buttonType="submit"
                       type="submit"
                       class="btn btn-success"
                       :block="true"
                       title="Распечатать"
                       :svgIcon="'printIcon'"
                       @click="printList(list.list_id)"
            />
          </td>
        </tr>
        <tr v-if="!lists.length" class="no-data text-center">
          <td colspan="14">Нет данных</td>
        </tr>
        </tbody>
      </table>
    </oy-page-body>
    <div class="body" id="printTable" style="width: 100%;height: 100%;margin: 0;padding: 0;background-color: #FAFAFA;font: 12pt 'Tahoma'; display: none;">
      <div class="page" style="min-height: 297mm; padding: 5mm;margin: 5mm auto;border-radius: 5px;background: white; box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);">
        <div class="d-flex flex-wrap">
          <div v-for="voucher in  vouchers" class="card" style="width: 15.5rem;border-radius: 0;border: 1px solid; height: auto" :key="voucher.id">
            <div class="card-body" style=" padding:.3rem;">
              <h6 class="card-title font-weight-bold" style="font-size: 15px; margin-bottom: 0.15rem;">ID:{{voucher.id}}</h6>
              <p class="card-text d-flex justify-content-center" style="font-size: 15px;font-weight: 700; margin-bottom: 0.15rem;">Your Wi-Fi code</p>
              <h5 class="d-flex justify-content-center font-weight-bold" style="font-size: 36px; color: #000000; margin-bottom: 0.5rem;">
                {{voucher.code}}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </oy-page>
</template>

<script>
  import VueHtmlToPaper from 'vue-html-to-paper';
  import Vue from 'vue';
  export default {
        name: "list",
    data() {
      return {
        spot_id: this.$route.params.sid,
      }
    },
    async asyncData ({ store, route }) {
      await store.dispatch('voucher/getLists', route.params.sid);
      return {}
    },
    methods: {
      async generate(){
        await this.$store.dispatch('voucher/generateVouchers', this.spot_id);
        await this.$store.dispatch('voucher/getLists', this.$route.params.sid);
      },
     async printList(id){
        await this.$store.dispatch('voucher/getPrintVouchers', id);
        await this.$htmlToPaper('printTable');
      },
    },
    computed: {
      lists: function () {
        return this.$store.getters['voucher/lists']
      },
      vouchers: function () {
        return this.$store.getters['voucher/vouchersToPrint']
      }
    },
    mounted() {
      const options = {
        name: '_blank',
        specs: [
          'fullscreen=yes',
          'titlebar=yes',
        ],
        styles: [
          'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
        ]
      }
      Vue.use(VueHtmlToPaper, options);
    },
    }
</script>

<style scoped>

</style>
