<template>
  <oy-page>
    <oy-page-header>
      <div slot="actions">
        <oy-button
          title="Создать стиль"
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
          <!--          <th></th>-->
        </tr>
        </thead>
        <tbody>
        <tr v-for="style in styles" :key="style.id">
          <td>{{ style.name }}</td>
          <td>{{ style.title }}</td>
          <!--          <td style="text-align: right"><oy-dot :active-color="style.enabled ? '#37a967':'red'"/></td>-->
        </tr>
        </tbody>
      </table>
    </oy-page-body>
  </oy-page>
</template>

<script>
  import storeStyle from "@/components/dashboard/company/modals/storeStyle";

  export default {
    components: {storeStyle},
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
