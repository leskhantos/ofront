<template>
  <header class="application-header">
    <div class="mobile-buttons">
      <oy-button  @click="">
        <ant-icon type="bars" slot="ant-icon" />
      </oy-button>
    </div>
    <div class="right-buttons">
      <user-menu >
        <user-menu-header slot="header" />
        <oy-avatar
          slot="trigger"
          cursor="pointer"
        />
        <!-- menu items -->
        <user-menu-item title="Сменить пароль" icon="icon-lock" />
        <user-menu-item title="Выйти" icon="icon-power" />
      </user-menu>
    </div>
  </header>
</template>

<script>
import userMenu from "@/components/dashboard/header/user-menu.vue";
import userMenuItem from "@/components/dashboard/header/user-menu-item.vue";
import userMenuHeader from "@/components/dashboard/header/user-menu-header.vue";
export default {
  components: {
    userMenu,
    userMenuItem,
    userMenuHeader
  },
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
