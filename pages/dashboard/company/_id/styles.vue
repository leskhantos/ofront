<template>
  <oy-page>
    <oy-page-header>
      <div slot="actions">
        <oy-button
          title="Создать"
          type="success"
          :svgIcon="'AddIcon'"
          @click="showModal"
        ></oy-button>
        <oy-modal
          title="Создать стиль"
          padding="1rem"
          :visible="set_new_style"
          @close="set_new_style = false"
        >
          <store-style :company_id="this.company_id"/>
        </oy-modal>
      </div>
    </oy-page-header>
    <oy-page-body :style="{ borderBottom: '1px solid rgba(0,0,0,.1)' }">
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
            <voucherIcon v-show="style.type===3" :color="'#f04641'"/>
            {{ style.name }}</td>
          <td >{{ style.spot }}</td>
        </tr>
        <tr v-if="!styles.length" class="no-data text-center">
          <td colspan="14">Нет данных</td>
        </tr>
        </tbody>
      </table>
    </oy-page-body>
  </oy-page>
</template>

<script>
  import storeStyle from "@/components/dashboard/company/modals/storeStyle";
  import smsIcon from "@/components/icons/smsIcon";
  import callIcon from "@/components/icons/callIcon";
  import voucherIcon from "@/components/icons/voucherIcon";

  export default {
    components: {storeStyle,smsIcon,callIcon,voucherIcon},
    data() {
      return {
        company_id: this.$route.params.id
      }
    },
    methods: {
      showModal() {
        this.$store.dispatch('spot/getSpotTypesByCompany', this.company_id)
        return this.set_new_style = true;
      },
    },
    computed: {
      styles: function () {
        return this.$store.getters['company/styles']
      },
      set_new_style: {
        get: function () {
          return this.$store.getters['app/set_new_style'];
        },
        set: function (value) {
          this.$store.commit('app/SET_NEW_STYLE', value);
        }
      },
    },
    mounted() {
      this.$store.dispatch('company/getStyles', this.company_id)
    }
  }
</script>

<style scoped>

</style>
