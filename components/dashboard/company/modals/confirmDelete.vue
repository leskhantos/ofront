<template>
  <div>
    <h6>Вы хотите удалить компанию <b>{{company.name}}</b>?</h6>
    <div class="d-flex justify-content-between">
      <button class="btn btn-danger" @click="deleteCompany">Удалить</button>
      <button class="btn btn-warning" @click="$emit('close')">Закрыть</button>
    </div>
  </div>

</template>

<script>
    export default {
        props:{
          company:{
            type:Object,
            required:false
          },
        },
      methods:{
        async deleteCompany() {
            try {
              await this.$axios.delete(`company/${this.company.id}`)
              await this.$store.dispatch("company/getCompanies");
              this.flashMessage.error({
                message: "Компания удалена",
                blockClass:'custom_alert_block_err',
                contentClass: 'custom_alert_content',
                wrapperClass: 'custom_alert_wrapper',
                x: (this.$vssWidth-300)*0.6,
                y: 5
              });
              this.$router.push({name: "dashboard-statistics"});
            } catch (e) {
              this.flashMessage.error({
                message: e.response.data.message,
                blockClass:'custom_alert_block_err',
                contentClass: 'custom_alert_content',
                wrapperClass: 'custom_alert_wrapper',
                x: (this.$vssWidth-300)*0.6,
                y: 5
              });
            }
          }
        },
    }
</script>

<style scoped>

</style>
