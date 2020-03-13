<template>
  <oy-page>
    <oy-page-body >
      <form @submit.prevent="renameCompany(company.id)">
        <div class="input-group mb-3">
          <input type="text" class="form-control" :placeholder="company.name" v-model="newName"
                 aria-describedby="basic-addon2">
        </div>
      </form>
      <oy-switch title="Включен" v-model="checkVal" :checked="checked" :marginLeft="'2.5rem'"/>
      <button type="submit" class="btn btn-success" @click="renameCompany(company.id)">Сохранить</button>
      <button class="btn btn-danger" @click="showModal">
        Удалить
      </button>
      <oy-modal
      :title="'Удалить компанию '"
      padding="1rem"
      :visible="confirm_delete"
      @close="confirm_delete = false"
    >
        <confirm-delete       @close="confirm_delete = false"
                              :company="company"/>
    </oy-modal>
    </oy-page-body>
  </oy-page>
</template>

<script>

  import confirmDelete from "@/components/dashboard/company/modals/confirmDelete";

  export default {
    data() {
      return {
        checkVal: '',
        company_id: this.$route.params.id,
        newName: '',
        edit: false,
      }
    },
    components:{confirmDelete},
    computed: {
      company: function () {
        return this.$store.getters["company/company"];
      },
      checked: function () {
        return this.company.enabled === 1;
      },
      confirm_delete: {
        get: function () {
          return this.$store.getters['app/confirm_delete'];
        },
        set: function (value) {
          this.$store.commit('app/CONFIRM_DELETE', value);
        }
      },
    },
    methods: {
      showModal() {
        return this.confirm_delete = true;
      },
      async changeStatus() {
        try {
          await this.$axios.put(`company/${this.company_id}`, {
            name: this.company.name,
            enabled: this.checkVal
          })
          this.flashMessage.success({
            title: "Компания обновлена",
            position: 'left top',
            x: 550,
            y: 0
          });
          await this.$store.dispatch("company/getCompanies");
        } catch (e) {
          console.log(e.response)
        }
      },
      async renameCompany(company_id) {
        try {
          let data = await this.$axios.put(`company/${company_id}`, {
            name: this.newName,
            enabled: this.company.enabled
          })
          await this.$store.dispatch("company/getCompanies");
          this.flashMessage.success({
            title: "Компания обновлена",
            position: 'left top',
            x: 550,
            y: 0
          });
          await this.$store.dispatch("company/getCompany", this.$route.params.id);
          this.$router.push({name: "dashboard-company-id-control", params: {id: data.data.id}});
          this.newName = ""
        } catch (e) {
          this.flashMessage.error({
            title: e.response.data.message,
            position: 'left top',
            x: 550,
            y: 0
          });
        }
      }
    },
    watch: {
      checkVal: {
        immediate: false,
        handler(val) {
          this.changeStatus(val)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
