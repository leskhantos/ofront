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
          <th></th>
        </tr>
        </thead>
        <tbody v-if="lists">
        <tr v-for="list in lists">
          <td>{{list.dt_start}}</td>
          <td>{{list.dt_end}}</td>
          <td>{{list.can_used}}</td>
          <td></td>
        </tr>
        <tr v-if="!lists.length" class="no-data text-center">
          <td colspan="14">Нет данных</td>
        </tr>
        </tbody>
      </table>
    </oy-page-body>
  </oy-page>
</template>

<script>

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
      generate(){
        this.$store.dispatch('voucher/generateVouchers', this.spot_id);
      }
    },
    computed: {
      lists: function () {
        return this.$store.getters['voucher/lists']
      },
    },
    }
</script>

<style scoped>

</style>
