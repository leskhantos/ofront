<template>
  <div>
    <h6>Вы хотите удалить компанию <b>{{company.name}}</b>?</h6>
    <div class="d-flex justify-content-between">
      <oy-button
        @click="deleteCompany"
        title="Удалить"
        type="danger"
        :svgIcon="'deleteIcon'"
      >
      </oy-button>
      <oy-button
        @click="$emit('close')"
        title="Закрыть"
        type="secondary"
        :svgIcon="'closeIcon'"
      >
      </oy-button>
    </div>
  </div>

</template>

<script>
    export default {
        props:{
          company:{
            type: Object,
            required:true
          },
        },
      methods:{
        async deleteCompany() {
            try {
              await this.$axios.delete(`companies/${this.company.id}`)
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
