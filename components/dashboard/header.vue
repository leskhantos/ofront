<template>
  <header class="application-header">
    <div class="mobile-buttons">
      <i class="icon icon-list mr-3"  @click="$store.commit('app/TOGGLE_SIDEBAR',true)"></i>

    </div>
    <div class="right-buttons">
      <user-menu :visible="user_menu_opened">
        <user-menu-header slot="header" :focused="user_menu_opened" :title="avatar"/>
        <oyAvatar
          slot="trigger"
          :focused="user_menu_opened"
          :title="avatar.name"
          @click="toggleUserMenu"
          cursor="pointer"
        />
        <!-- menu items -->
        <user-menu-item title="Сменить пароль" icon="icon-lock" @click="onItemClick('password')" />
        <user-menu-item title="Выйти" icon="icon-power" @click="onItemClick('logout')" />
      </user-menu>
    </div>
  </header>
</template>

<script>
  import userMenu from "@/components/dashboard/header/user-menu.vue";
  import userMenuItem from "@/components/dashboard/header/user-menu-item.vue";
  import userMenuHeader from "@/components/dashboard/header/user-menu-header.vue";
  import oyAvatar from "../oyUI/base/oyAvatar";
  import oyButton from "../oyUI/base/oyButton";
  const Cookie = process.client ? require('js-cookie') : undefined

  export default {
    mounted() {
      window.addEventListener("click", this.menuClickHandler, true);
    },
    beforeDestroy() {
      window.removeEventListener("click", this.menuClickHandler, true);
    },
    data: () => ({
      user_menu_opened: false,
    }),
    computed: {
      avatar: function() {
        return this.$store.getters["users/user"];
      },
      set_password_mode: {
        get: function() {
          return this.$store.getters["app/set_password_mode"];
        },
        set: function (value) {
          this.$store.commit('app/SET_PASSWORD_MODE', value);
        }
      },
    },
    components: {
      userMenu,
      userMenuItem,
      userMenuHeader,
      oyAvatar,
      oyButton,
    },
    methods: {
      toggleUserMenu() {
        this.user_menu_opened = !this.user_menu_opened;
      },
      menuClickHandler(event) {
        if (
          event.target.closest(".user-menu") === null &&
          this.user_menu_opened
        ) {
          this.user_menu_opened = false;
        }
      },
      async logout(){
        try{
          await this.$axios.get('auth/logout').then((res)=>{
            console.log(res.data)
            Cookie.remove('auth')
            this.$store.commit('setAuth', null)
            this.$router.push('/');
          })
        }catch (e) {

        }
      },
      onItemClick(name) {
        switch (name) {
          case "logout":
            this.logout();
            break;

          case "password":
            this.set_password_mode = true;
            break;

          default:
            this.$router.push({ name: name });
            break;
        }
        this.user_menu_opened = false;
      }
    },
    beforeMount(){
      this.user = this.$store.state.users.user
    }
  };
</script>

<style lang="scss" scoped>
  .application-header {
    z-index: 1060;
    min-width: 320px;
    backface-visibility: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02);
    background-color: #ffffff;
    padding: 0.7rem 2rem;
    display: flex;
    align-items: center;
    flex-direction: row;

    .right-buttons {
      flex: 1;
      display: flex;
      -webkit-box-pack: end;
      justify-content: flex-end;
    }

    .mobile-buttons {
      display: none;
    }
  }

  @media screen and (max-width: 992px) {
    .application-header {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      box-shadow: none;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }

    .mobile-buttons {
      display: flex !important;
    }
  }
</style>
