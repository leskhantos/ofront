<template>
  <div class="dashboard-layout">
    <client-only>
      <sidebar/>
      <oyModal
        :visible="set_password_mode"
        @close="set_password_mode = false"
        title="Сменить пароль"
        padding="1rem"
        minWidth="350px"
      >
        <setPasswordForm @success="set_password_mode = false"/>
      </oyModal>
      <div class="dashboard-layout__content-wrapper">
        <dashHeader/>
        <transition name="page" mode="out-in">
          <nuxt></nuxt>
        </transition>
      </div>
    </client-only>
  </div>
</template>

<script>
  import dashHeader from "@/components/dashboard/header";
  import sidebar from "@/components/dashboard/sidebar/sidebar";
  import setPasswordForm from "@/components/auth/set-password-form"
  import oyModal from "@/plugins/oyUI/base/oyModal";

  export default {
    middleware: 'authenticated',
    name: "dashboard",
    components: {
      sidebar,
      dashHeader,
      setPasswordForm,
      oyModal
    },
    computed: {
      set_password_mode: {
        get: function () {
          return this.$store.getters["app/set_password_mode"];
        },
        set: function (value) {
          this.$store.commit('app/SET_PASSWORD_MODE', value);
        }
      }
    },
    mounted() {
      this.$store.dispatch('users/getUser')
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard-layout {
    display: flex;
    flex-direction: row;
    height: 100vh;
    background-color: #f5f5f5;

    &__content-wrapper {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
</style>
