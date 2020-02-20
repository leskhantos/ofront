<template>
  <oy-page>
    <oy-page-header/>
    <oy-page-body :style="{borderBottom: '1px solid rgba(0,0,0,.1)' }">
      <setting-item title="Суточный лимит СМС на одно устройство:" :value="'5'" />
      <setting-item title="Суточный лимит СМС на один номер:" :value="'5'"/>
      <setting-item title="Время жизни СМС кода:" :value="'90'"/>
      <setting-item title="Время жизни авторизации сессии:" :value="'90'"/>
    </oy-page-body>
  </oy-page>
</template>

<script>
import SettingItem from "../../components/dashboard/settings/setting-item";
export default {
  components: {SettingItem},
  layout: "dashboard",
  metaInfo() {
    return {
      titleTemplate: "%s | Настройки"
    };
  }
};
</script>
