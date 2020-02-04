<template>
  <div class="auth-page">
    <div class="auth-page__bg" :style="{ backgroundImage: `url(${bg})` }">
      <div class="auth-page__gradient-wrapper">
        <form @submit.prevent="authMe" class="auth-page__card">
          <div class="logo" :style="{ backgroundImage: `url(${logo})` }"></div>
          <Inputs
            label="USERNAME"
            v-model="form.login"
          />

          <Inputs
            label="PASSWORD"
            type="password"
            v-model="form.password"
          />
          <button class="button" type="submit">АВТОРИЗАЦИЯ</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import bg from '@/static/bg.jpg';
  import logo from '@/static/logo.png';
  import Inputs from '@/components/inputs.vue';

  const Cookie = process.client ? require('js-cookie') : undefined

  export default {
    layout: "auth",
    data: () => ({
      bg: bg,
      logo: logo,
      form: {
        login: "",
        password: ""
      },
      errors: {
        login: "",
        password: ""
      }
    }),
    components: {
      Inputs
    },
    methods: {
      async authMe () {
        try {
          await this.$store.dispatch('auth/login', this.form);
          // await this.$store.dispatch('user/loadUser');
          //this.$router.push({ name: 'dashboard-statistics' });
        } catch (error) {
          return false;
        }
      },
    }
  }
</script>
<style lang="scss" scoped >

  @import url("https://fonts.googleapis.com/css?family=Roboto:300,400&display=swap");

  .auth-page {
    &__bg {
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }

    &__gradient-wrapper {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(
          145deg,
          rgba(18, 223, 106, 0.3) 0%,
          rgba(9, 9, 121, 0) 35%,
          rgba(234, 21, 156, 0.3) 100%
      );
    }

    &__card {
      width: 360px;
      border-radius: 3px;
      background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0.9),
          rgba(255, 255, 255, 0.4)
      );
      border-top: 2px solid #fff;

      .logo {
        display: inline-block;
        width: 120px;
        height: 50px;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        margin: 12px 15px;
      }

      .button {
        display: inline-block;
        cursor: pointer;
        width: 100%;
        height: 40px;
        background: #f04641;
        border: 0;
        border-radius: 0 0 4px 4px;
        color: #fff;
        font-family: "Roboto";
        font-size: 17px;
        padding-top: 4px;
        text-decoration: none;
        text-align: center;
        font-weight: 300;
        bottom: 0;
        transition: 0.2s;
        outline: none;
      }
      .button:hover {
        text-decoration: none;
        background: #ff0000;
      }
    }
  }
</style>
