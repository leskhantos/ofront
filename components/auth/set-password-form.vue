<template>
  <form @submit.prevent="updatePassword">
    <oyInput label="Старый пароль" v-model="form.oldPassword" type="password" :error="errors['oldPassword']"/>
    <oyInput label="Новый пароль" v-model="form.password" type="password"/>
    <oyInput label="Подтвердите новый пароль" v-model="new_password_confirmation" type="password"/>
    <transition class="row">
      <p v-if="notSamePasswords" class="col-xs-12 center-block text-center">Пароли не совпадают.</p>
    </transition>
    <div class="mb-0 mt-3">
      <oyButton type="success" buttonType="submit" title="Сохранить" :block="true"/>
    </div>
  </form>
</template>

<script>
  import oyInput from "../../plugins/oyUI/base/oyInput";
  import oyButton from "../../plugins/oyUI/base/oyButton";

  export default {
    data: () => ({
      form: {
        oldPassword: '',
        password: '',
      },
      new_password_confirmation: '',
    }),
    components: {
      oyInput, oyButton
    },
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
            await this.$axios.put(`put-users/${this.$store.getters['users/user'].id}/pass`, this.form)
            this.$store.commit("app/SET_PASSWORD_MODE", false);
            this.flashMessage.success({
              title: "Пароль обновлен",
            });
          }
        } catch (e) {
          console.log(e.response.data)
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  p {
    color: #dc3545;
    bottom: -1.1rem;
  }
</style>
