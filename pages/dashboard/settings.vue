<template>
  <oy-page>
    <div class="d-flex flex-column" v-if="settings">
      <setting-item title="URL ссылка переадресации после авторизации:" v-model="payload.redirect_url"/>
      <setting-item title="Время жизни автоматической авторизации для устройства:"
                    :value="settings.session_auth_timer ? settings.session_auth_timer : 'нет данных'"/>
      <setting-item title="Время жизни сессии устройства:" :value="settings.session_timer ? settings.session_timer : 'нет данных'"/>
      <setting-item title="Время ожидания звонка, кода из SMS или кода ваучера:" :value="settings.wait_enter_timer?settings.wait_enter_timer: 'нет данных'"/>
      <setting-item title="Суточный лимит SMS на один номер:" :value="settings.sms_phone_limit?settings.sms_phone_limit: 'нет данных'"/>
      <setting-item title="Суточный лимит SMS на одно устройство:" :value="settings.sms_device_limit?settings.sms_device_limit: 'нет данных'"/>
      <setting-item title="Время жизни кода SMS:" :value="settings.sms_life_timer?settings.sms_life_timer: 'нет данных'"/>
      <setting-item title="Разрешить международные SMS:" :value="settings.sms_allow_country?settings.sms_allow_country: 'нет данных'"/>
      <setting-item title="Время ожидания звонка:" :value="settings.call_wait_timer?settings.call_wait_timer: 'нет данных'"/>
      <setting-item title="Разрешить международные звонки:" :value="settings.call_allow_country?settings.call_allow_country: 'нет данных'"/>
      <setting-item title="Возможное количество устройств на один ваучер:" :value="settings.voucher_max_devices?settings.voucher_max_devices: 'нет данных'"/>
      <setting-item title="Включить мониторинг активности зоны:" :value="settings.monitoring_enabled?settings.monitoring_enabled: 'нет данных'"/>
      <setting-item title="Таймер простоя зоны до оповещения о неактивности:" :value="settings.monitoring_alert_timer?settings.monitoring_alert_timer: 'нет данных'"/>
    </div>
    <div class="d-flex justify-content-end">
      <oy-button
        title="Сохранить"
        type="success"
        @click="saveSettings"
        :svgIcon="'saveIcon'"
      >
      </oy-button>
    </div>
  </oy-page>
</template>

<script>
  import SettingItem from "@/components/dashboard/settings/setting-item";

  export default {
    components: {SettingItem},
    layout: "dashboard",
    metaInfo() {
      return {
        titleTemplate: "%s | Настройки"
      };
    },
    data(){
      return{
        payload:{
          redirect_url:''
        }
      }
    },
    async asyncData ({ store }) {
      await store.dispatch('setting/getSettings');
      return {}
    },
    computed: {
      settings: function () {
        return this.$store.getters['setting/settings']
      }
    },
    methods:{
      saveSettings: function(){
      }
    },
    mounted() {
      if (this.settings){
        this.payload.redirect_url = this.settings.redirect_url
      }
    }
  };
</script>
