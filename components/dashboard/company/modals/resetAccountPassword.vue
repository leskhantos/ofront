<template>
  <form @submit.prevent="updatePassword">
    <oy-input label="Новый пароль" v-model="form.password" type="password"/>
    <oy-input label="Подтвердите новый пароль" v-model="new_password_confirmation" type="password"/>
    <transition class="row">
      <p v-if="notSamePasswords" class="col-xs-12 center-block text-center">Пароли не совпадают.</p>
    </transition>
    <div class="mb-0 mt-3">
      <oy-button type="success" buttonType="submit" title="Сохранить" :block="true"/>
    </div>
  </form>
</template>

<script>
  export default {
    props:{
      account:{
        type: Object,
        required: true
       }
    },
    data: () => ({
      form:{
        password: ''
      },
      new_password_confirmation: '',
    }),
    computed: {
      notSamePasswords() {
        if (this.passwordsFilled) {
          return (this.form.password !== this.new_password_confirmation)
        } else {
          return false
        }
      },
      passwordsFilled() {
        return (this.form.password !== '' && this.new_password_confirmation !== '')
      },
    },
    methods: {
      async updatePassword() {
        try {
          if (!this.notSamePasswords) {
            await this.$axios.put(`put-accounts/${this.account.id}/pass`, this.form)
            this.$store.commit("app/RESET_ACCOUNT_PASSWORD", false);
            this.flashMessage.success({
              message: "Сброшен пароль",
              blockClass:'custom_alert_block',
              contentClass: 'custom_alert_content',
              wrapperClass: 'custom_alert_wrapper',
              x: (this.$vssWidth-300)*0.6,
              y: 5
            });
          }
        } catch (e) {
          console.log(e.response.data)
        }
      }
    }
  };
</script>

<style scoped>
  p {
    color: #dc3545;
    bottom: -1.1rem;
  }
</style>
