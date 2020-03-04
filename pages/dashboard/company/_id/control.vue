<template>
  <oy-page>
    <oy-page-header/>
    <oy-page-body :style="{ borderTop: '1px solid rgba(0,0,0,.1)', borderBottom: '1px solid rgba(0,0,0,.1)' }">
      <form @submit.prevent="renameCompany(company.id)">
        <div class="input-group mb-3">
          <input type="text" class="form-control" :placeholder="company.name" v-model="newName"
                 aria-describedby="basic-addon2">
        </div>
      </form>
      <oy-switch title="Включен" v-model="checkVal" :checked="checked"/>
      <button type="submit" class="btn btn-success" @click="renameCompany(company.id)">Сохранить</button>
      <button class="btn btn-danger" @click="deleteCompany">
        Удалить
      </button>
    </oy-page-body>
  </oy-page>
</template>

<script>
  import editCompanyIcon from "@/components/icons/editCompanyIcon";

  export default {
    components: {editCompanyIcon},
    data() {
      return {
        checkVal: '',
        company_id: this.$route.params.id,
        newName: '',
        edit: false,
      }
    },
    computed: {
      company: function () {
        return this.$store.getters["company/company"];
      },
      checked: function () {
        return this.company.enabled === 1;
      }
    },
    methods: {
      async deleteCompany() {
        let del = confirm("Уверены ?");
        if (del) {
          try {
            await this.$axios.delete(`company/${this.company_id}`)
            await this.$store.dispatch("company/getCompanies");
            this.flashMessage.warning({
              title: "Компания удалена",
            });
            this.$router.push({name: "dashboard-statistics"});
          } catch (e) {
            this.flashMessage.error({
              title: e.response.data.message,
            });
          }
        }
      },
      async changeStatus() {
        try {
          await this.$axios.put(`company/${this.company_id}`, {
            name: this.company.name,
            enabled: this.checkVal
          })
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
          });
          await this.$store.dispatch("company/getCompany", this.$route.params.id);
          this.$router.push({name: "dashboard-company-id-main", params: {id: data.data.id}});
          this.newName = ""
        } catch (e) {
          this.flashMessage.error({
            title: e.response.data.message,
          });
        }
      }
    },
    mounted() {
      this.checkVal = this.checked
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
