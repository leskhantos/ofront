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
            <input type="checkbox" class="custom-control-input" id="customSwitch1" :checked="checked">
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
        name: "control",
      props:{
          checked:{
            type:Boolean,
            required: false
          },
        company_id:{
            type: Number,
            required: true
        }
      },
      methods:{
        async deleteCompany(){
          try {
            await this.$axios.delete(`company/${this.company_id}`).then((res)=>{
              this.$store.dispatch("company/getCompanies");
              this.flashMessage.warning({
                title: "Компания удалена",
              });
              this.$router.push({ name: "dashboard-users"});
            })
          } catch (e) {
            this.flashMessage.error({
              title: e.response.data.message,
            });
          }
        },
      }
    }
</script>

<style scoped>

</style>
