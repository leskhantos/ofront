<template>
  <oy-page>
    <oy-page-header title="Управление"/>
    <oy-page-body :style="{ borderTop: '1px solid rgba(0,0,0,.1)', borderBottom: '1px solid rgba(0,0,0,.1)' }">
      <div class="row">
        <div class="col-md-1">
          <p>Включен:</p>
        </div>
        <div class="col-md-11">
          <div class="custom-control custom-switch">
            <input type="checkbox" class="custom-control-input" id="customSwitch1" v-model="checkVal"
                   :checked="checked">
            <label class="custom-control-label" for="customSwitch1"></label>
          </div>
        </div>
      </div>
      <button class="btn btn-danger" @click="deleteCompany">
        Удалить
      </button>
    </oy-page-body>
  </oy-page>
</template>

<script>
  export default {
    data() {
      return {
        checkVal: null
      }
    },
    name: "control",
    props: {
      checked: {
        type: Boolean,
        required: false
      },
      company_id: {
        type: Number,
        required: true
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
            this.$router.push({name: "dashboard-users"});
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
            enabled: this.checkVal
          })
          await this.$store.dispatch("company/getCompanies");
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
      checkVal: function (val) {
        this.changeStatus(val)
      }
    }
  }
</script>

<style scoped>

</style>
