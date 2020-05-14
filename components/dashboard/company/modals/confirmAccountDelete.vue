<template>
  <div>
  <h6>Вы хотите удалить аккаунт <b>{{account.login}}</b>?</h6>
  <div class="d-flex justify-content-between">
    <oy-button
      @click="deleteAccount"
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
        name: "confirmAccountDelete",
      props:{
        account:{
          type:Object,
          required: true
        },
        company_id:{
          type: Number,
          required: true
        }
      },
      methods:{
        async deleteAccount() {
          try {
            await this.$axios.delete(`users/${this.account.id}`)
            await this.$store.dispatch('company/getAccounts', this.company_id)
            this.$emit('close')
            this.flashMessage.error({
              message: "Аккаунт удален",
              blockClass:'custom_alert_block_err',
              contentClass: 'custom_alert_content',
              wrapperClass: 'custom_alert_wrapper',
              x: (this.$vssWidth-300)*0.6,
              y: 5
            });
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
