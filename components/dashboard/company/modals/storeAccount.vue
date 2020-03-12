<template>
  <form @submit.prevent="storeAccount">
    <div class="row">
      <oy-input
        label="Email"
        v-model="form.email"
        input-class="col-lg-12"
        :error="errors['email']"
      />
    </div>
    <div class="row" style="padding-right: 16px">
      <oy-input label="Пароль" v-model="form.password" input-class="col-lg-10" type="text" :error="errors['password']"/>
      <oy-button buttonType="button" alt="Сгенерировать пароль" :svgIcon="'passGenerateIcon'" class="col-lg-2"
                 @click="generatePass"/>
    </div>

    <div class="mt-3">
      <oy-button type="success" buttonType="submit" title="Сохранить" :block="true"/>
    </div>
  </form>
</template>

<script>
  export default {
    name: "storeAccount",
    props: {
      company_id: {
        type: Number,
        required: true
      },
    },
    data() {
      return {
        form: {
          email: '',
          password: '',
        }
      }
    },
    methods: {
      generatePass() {
        this.form.password = Math.random().toString(36).slice(-8);
      },
      async storeAccount() {
        try {
          const payload = {
            company_id: this.company_id,
            email: this.form.email,
            password: this.form.password,
          };
          await this.$axios.post('account', payload)
          this.$store.commit("app/SET_NEW_ACCOUNT", false);
          await this.$store.dispatch('company/getAccounts', this.company_id)
          this.flashMessage.success({
            title: "Аккаунт добавлен",
            position: 'left top',
            x: 550,
            y: 0
          });
        } catch (e) {
          console.log(e)
        }
      }
    }

  }
</script>

<style scoped>
  .row button {
    margin-bottom: 18px;
    margin-top: 25px;
    padding: 0 0 0 30px;
  }
</style>
