<template>
  <oy-page>
    <form @submit.prevent = 'saveSettings'>
    <div class="d-flex flex-column" >
      <setting-item title="URL ссылка переадресации после авторизации:" v-model="payload.redirect_url" :error="errors['redirect_url']"/>
      <setting-item title="Время жизни автоматической авторизации для устройства:"
                    v-model="payload.session_auto_timer" :error="errors['session_auto_timer']"/>
      <setting-item title="Время жизни сессии устройства:" v-model="payload.session_timer" :error="errors['session_timer']"/>
      <setting-item title="Время ожидания звонка, кода из SMS или кода ваучера:" v-model="payload.wait_enter_timer" :error="errors['wait_enter_timer']"/>
      <setting-item title="Суточный лимит SMS на один номер:" v-model="payload.sms_phone_limit" :error="errors['sms_phone_limit']"/>
      <setting-item title="Суточный лимит SMS на одно устройство:" v-model="payload.sms_device_limit" :error="errors['sms_device_limit']"/>
      <setting-item title="Время жизни кода SMS:" v-model="payload.sms_life_timer" :error="errors['sms_life_timer']"/>
      <setting-item title="Разрешить международные SMS:" v-model="payload.sms_allow_country" :error="errors['sms_allow_country']"/>
      <setting-item title="Время ожидания звонка:" v-model="payload.call_wait_timer" :error="errors['call_wait_timer']"/>
      <setting-item title="Разрешить международные звонки:" v-model="payload.call_allow_country" :error="errors['call_allow_country']"/>
      <setting-item title="Возможное количество устройств на один ваучер:"  v-model="payload.voucher_max_devices" :error="errors['voucher_max_devices']"/>
      <setting-item title="Включить мониторинг активности зоны:"  v-model="payload.monitoring_enabled" :error="errors['monitoring_enabled']"/>
      <setting-item title="Таймер простоя зоны до оповещения о неактивности:" v-model="payload.monitoring_alert_timer" :error="errors['monitoring_alert_timer']"/>
    </div>
    <div class="d-flex justify-content-end">
      <oy-button
        title="Сохранить"
        type="success"
        button-type="submit"
        :svgIcon="'saveIcon'"
      >
      </oy-button>
    </div>
    </form>
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
          id: null,
          date: '',
          user_id: null,
          redirect_url:'',
          session_auto_timer:'',
          session_timer:'',
          wait_enter_timer: '',
          sms_phone_limit: '',
          sms_device_limit:'',
          sms_life_timer:'',
          sms_allow_country:'',
          call_wait_timer:'',
          call_allow_country:'',
          voucher_max_devices:'',
          monitoring_enabled:'',
          monitoring_alert_timer: ''
        }
      }
    },
    async asyncData ({ store }) {
      await store.dispatch('setting/getSettings');
      return {}
    },
    methods: {
      convertDates: function () {
        let date = new Date()
        let month = date.getMonth()+1
        let minute = date.getMinutes()
        let day = date.getDate()
        let hour = date.getHours()
        if(month<10){
          month = '0'+month
        }
        if(minute<10){
          minute = '0'+minute
        }
        if (day<10){
          day = '0'+day
        }
        if (hour<10){
          day = '0'+day
        }
        let start = date.getFullYear()+'-'+month+'-'+day+' '+hour+':'+minute;
        this.payload.date = start.toString()
      },
       saveSettings: async function(){
        try{
          this.payload.user_id = this.user.id;
          this.convertDates()
          if(this.settings){
            await this.$store.dispatch('setting/updateSettings', this.payload)
          }else{
            await this.$store.dispatch('setting/setSettings', this.payload)
          }
          this.flashMessage.success({
            message: "Настройки сохранены",
            blockClass:'custom_alert_block',
            contentClass: 'custom_alert_content',
            wrapperClass: 'custom_alert_wrapper',
            x: (this.$vssWidth-300)*0.6,
            y: 5
          });
        }catch(err){
          console.log(err)
        }
      }
    },
    computed: {
      settings: function () {
        return this.$store.getters['setting/settings']
      },
      user: function () {
        return this.$store.getters['users/user']
      }
    },
    mounted() {
      if (this.settings){
        this.payload.id = this.settings.id,
        this.payload.redirect_url = this.settings.redirect_url,
        this.payload.session_auto_timer = this.settings.session_auto_timer,
        this.payload.session_timer = this.settings.session_timer,
        this.payload.wait_enter_timer = this.settings.wait_enter_timer,
        this.payload.sms_phone_limit = this.settings.sms_phone_limit,
        this.payload.sms_device_limit = this.settings.sms_device_limit,
        this.payload.sms_life_timer = this.settings.sms_life_timer,
        this.payload.sms_allow_country = this.settings.sms_allow_country,
        this.payload.call_wait_timer = this.settings.call_wait_timer,
        this.payload.call_allow_country = this.settings.call_allow_country,
        this.payload.voucher_max_devices = this.settings.voucher_max_devices,
        this.payload.monitoring_enabled = this.settings.monitoring_enabled,
        this.payload.monitoring_alert_timer = this.settings.monitoring_alert_timer
      }
    }
  };
</script>
