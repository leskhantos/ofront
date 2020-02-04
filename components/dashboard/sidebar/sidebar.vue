<template>
  <div class="dashboard-layout__sidebar" >
    <div class="dashboard-layout__sidebar--static-section">
      <div class="header-wrapper">
        <div class="header">
          <div class="logo">
            <img :src="logo" alt="logo" class="img-fluid" />
          </div>
        </div>
        <div class="mobile-close-button" >

        </div>
      </div>
      <div class="dashboard-layout__sidebar--system-nav">
        <menu-header title="Основное" />
        <menu-item icon="icon-chart" title="Статистика" :route="{ name: 'dashboard-statistics' }" />
        <menu-item icon="icon-user" title="Пользователи" :route="{ name: 'dashboard-users' }" />
        <menu-item icon="icon-settings" title="Настройки" :route="{ name: 'dashboard-settings' }" />
        <menu-item
          icon="icon-speedometer"
          title="Диагностика"
          :route="{ name: 'dashboard-diagnostics' }"
        />
        <menu-header title="Компании">
          <div slot="extra" class="add-company-button">
            <i class="icofont-plus"></i>
          </div>
        </menu-header>
      </div>
    </div>
    <div class="dashboard-layout__sidebar--dynamic-section custom-sroll">
      <div class="dashboard-layout__sidebar--companies-nav">
        <menu-item
        />
      </div>
    </div>
    <div class="dashboard-layout__sidebar--mobile-logout-bitton">
      <i class="icon-power mr-3"></i>
      <span>Выйти</span>
    </div>

    <oy-modal name="name"
      title="Добавить компанию"
      padding="1rem"
    >
      <add-company-form/>
    </oy-modal>
  </div>
</template>

<script>
import logo from "@/static/logo.png";
import addCompanyForm from './addCompanyForm.vue';
import menuItem from "@/components/dashboard/sidebar/menu-item.vue";
import menuHeader from "@/components/dashboard/sidebar/menu-header.vue";
export default {
  data: () => ({
    logo: logo,
    newCompanyMode: false
  }),
  components: {
    menuItem,
    menuHeader,
    addCompanyForm
  }
};
</script>

<style lang="scss">
$logo-width: 100px;
$sidebar-width: 300px;

.dashboard-layout__sidebar {
  width: $sidebar-width;
  background-color: #2c343f;
  display: flex;
  flex-direction: column;
  height: 100vh;

  .add-company-button {
    transition: 0.2s;

    &:hover {
      color: white;
      cursor: pointer;
    }
  }

  &--static-section {
    .header {
      flex: 1;
      padding: 0.7rem 1.25rem;
      background-color: #3c434d;

      &-wrapper {
        display: flex;
        justify-content: space-between;
      }

      .logo {
        width: $logo-width;
      }
    }

    .mobile-close-button {
      display: none;
    }

    @media screen and (max-width: 992px) {
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .mobile-close-button {
        cursor: pointer;
        color: white;
        display: flex;
        background-color: #3c434d;
        border-left: 1px solid #2c343f;
        align-items: center;
        justify-content: center;
        width: 3.5rem;
        // font-size: 1.5rem;
      }
    }
  }

  &--dynamic-section {
    flex: 1;
    overflow-y: scroll;
  }

  &--mobile-logout-bitton {
    display: none;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding: 10px 35px;
    color: #db3737;
    cursor: pointer;
  }

  @media screen and (max-width: 992px) {
    &--mobile-logout-bitton {
      display: block;
    }
  }

  .content {
    flex: 1;
    background-color: #2c343f;
  }
}

@media screen and (max-width: 992px) {
  .dashboard-layout__sidebar {
    position: absolute;
    z-index: 50000;
    top: 0;
    left: -100%;
    right: 0;
    height: 0;
    width: 100%;
    height: 100vh;
    transition: 0.2s;
  }

  .opened {
    left: 0 !important;
  }
}
</style>
