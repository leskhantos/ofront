<template>
  <header class="application-header">
    <div class="mobile-buttons" @click="$store.commit('app/TOGGLE_SIDEBAR',true)">
      <menu-open-icon/>
    </div>

    <div class="page-header">
      <div class="page-header__title">
        <nuxt-link :to="this.route">
          {{ title }}
        </nuxt-link>
        <div v-show="showOnly">
          <spot-icon/>
          {{ spotName }}
        </div>
      </div>
    </div>

    <div class="right-buttons">
      <user-menu :visible="user_menu_opened" v-if="avatar.name">
        <user-menu-header slot="header" :focused="user_menu_opened" :title="avatar.name[0]"/>
        <oyAvatar
          slot="trigger"
          :focused="user_menu_opened"
          :title="avatar.name[0]"
          @click="toggleUserMenu"
          cursor="pointer"
        />
        <user-menu-item title="Сменить пароль" icon="icon-lock" @click="onItemClick('password')"/>
        <user-menu-item title="Выйти" icon="icon-power" @click="onItemClick('logout')"/>
      </user-menu>
    </div>
  </header>
</template>

<script>
  import userMenu from "@/components/dashboard/header/user-menu.vue";
  import userMenuItem from "@/components/dashboard/header/user-menu-item.vue";
  import userMenuHeader from "@/components/dashboard/header/user-menu-header.vue";
  import oyAvatar from "../../plugins/oyUI/base/oyAvatar";
  import MenuOpenIcon from "../icons/menuOpenIcon";
  import SpotIcon from "../icons/spotIcon";

  const Cookie = process.client ? require('js-cookie') : undefined

  export default {
    mounted() {
      this.toggleTitle()
      window.addEventListener("click", this.menuClickHandler, true);
    },
    beforeDestroy() {
      window.removeEventListener("click", this.menuClickHandler, true);
    },
    data: () => ({
      user_menu_opened: false,
      title: '',
      route: '',
      spotName: ''
    }),
    computed: {
      avatar: function () {
        return this.$store.getters["users/user"];
      },
      set_password_mode: {
        get: function () {
          return this.$store.getters["app/set_password_mode"];
        },
        set: function (value) {
          this.$store.commit('app/SET_PASSWORD_MODE', value);
        }
      },
      company: function () {
        return this.$store.getters["company/company"];
      },
      spot: function () {
        return this.$store.getters["spot/spot"];
      },
      showOnly() {
        return !!this.$route.params.sid;
      },
    },
    components: {
      SpotIcon,
      MenuOpenIcon,
      userMenu,
      userMenuItem,
      userMenuHeader,
      oyAvatar
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
      async logout() {
        try {
          await this.$axios.get('auth/logout').then((res) => {
            console.log(res.data)
            Cookie.remove('auth')
            this.$store.commit('setAuth', null)
            this.$router.push('/');
          })
        } catch (e) {
          console.log(e.response)
        }
      },
      async toggleTitle() {
        if (this.$route.params.id) {
          await this.$store.dispatch('company/getCompany', this.$route.params.id)
          this.route = {name: 'dashboard-company-id-main', params: {id: this.$route.params.id}}
          this.title = this.company.name;
          if (this.showOnly) {
            await this.$store.dispatch('spot/getSpot', this.$route.params.sid)
            this.spotName = this.spot.address
          }
        } else {
          switch (this.$route.name) {
            case 'dashboard-users':
              this.title = 'Пользователи';
              break;
            case 'dashboard-statistics':
              this.title = 'Основное';
              break;
            case 'dashboard-settings':
              this.title = 'Настройки';
              break;
            case 'dashboard-diagnostics':
              this.title = 'Диагностика';
              break;
            default:
              this.title = 'default';
              break;
          }
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
            this.$router.push({name: name});
            break;
        }
        this.user_menu_opened = false;
      }
    },
    watch: {
      '$route': function () {
        this.toggleTitle()
      }
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

    .page-header__title {
      display: flex;

      a {
        font-weight: bold;
        font-size: x-large;
        color: #575962;
      }
    }

    .mobile-buttons {
      display: none;
      padding-right: .3rem;
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
