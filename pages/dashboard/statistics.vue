<template>
  <div class="statistics-page">
    <div class="row" ref="metrics">
      <metric title="Компании" :number="stats.count_company" :currentIcon="'companyIcon'"/>
      <metric title="Зон" :number="stats.count_spot" :currentIcon="'SpotIcon'"/>
      <metric title="Персональных страниц" :number="stats.pages" :currentIcon="'pageIcon'"/>
      <metric title="Сохраненных устройств" :number="stats.count_all_device" :currentIcon="'devicesIcon'"/>
      <metric title="Новых устройств" :number="stats.count_new_device" :currentIcon="'newDeviceIcon'"/>
      <metric title="Авторизованных гостей" :number="stats.auth_guest" :currentIcon="'authGuestIcon'"/>
      <metric title="Актуальных сессий" :number="stats.session" :currentIcon="'actualSessionIcon'"/>
    </div>
    <div class="row">
      <div class="col-lg-8">
      </div>
      <div class="col-lg-4 float-right row">
        <oy-select class="col"
                   firstOption="Месяц"
                   @childToParent="onChangeMonth"
                   :options="months"
                   :selected="form.month"
                   v-model="form.month"
        />

        <oy-select class="col"
                   first-option="Год"
                   @childToParent="onChangeYear"
                   :options="years"
                   :selected="form.year"
                   v-model="form.year"
        />
      </div>
    </div>
    <oy-page-header title="Звонки"></oy-page-header>
    <div class="calls-charts-card">
        <calls />
    </div>

    <oy-page-header title="SMS"></oy-page-header>
    <div class="sms-charts-card">
      <sms />
    </div>
  </div>
</template>

<script>
import sms from "@/components/dashboard/statistics/sms.vue";
import calls from "@/components/dashboard/statistics/calls.vue";
import metric from "@/components/dashboard/statistics/metrica.vue";

export default {
  layout: "dashboard",
  data(){
    return{
      form:{
        year:null,
        month:null,
      },
      months:[
        {id:1, name:'Январь'},
        {id:2, name:'Февраль'},
        {id:3, name:'Март'},
        {id:4, name:'Апрель'},
        {id:5, name:'Май'},
        {id:6, name:'Июнь'},
        {id:7, name:'Июль'},
        {id:8, name:'Август'},
        {id:9, name:'Сентябрь'},
        {id:10, name:'Октябрь'},
        {id:11, name:'Ноябрь'},
        {id:12, name:'Декабрь'},
      ]
    }
  },
  metaInfo() {
    return {
      titleTemplate: "%s | Статистика"
    };
  },
  created () {
    let date = new Date();

    this.form.month = date.getMonth()+1
    this.form.year = date.getFullYear()
    this.$store.dispatch('statistics/getStats');
    this.$store.dispatch('statistics/getSmsPerMonth',this.form);
  },

  methods: {
    onChangeMonth(val) {
      console.log(Object.keys(this.smsPerMonth.sms)) // get categories for apexchart test
      this.form.month = val
    },
    onChangeYear(val) {
      this.form.year = val
    },
  },
  computed:{
    stats:function () {
        return this.$store.getters['statistics/stats']
    },
    years:function () {
      let currentYear = new Date().getFullYear(), years = [], startYear=2018;
      while ( startYear <= currentYear ) {
        years.push({id:startYear++});
      }
      return years;
    },
    smsPerMonth:function () {
      return this.$store.getters['statistics/smsPerMonth']
    }
  },
  components: {
    sms,
    calls,
    metric
  },
  watch:{
    'form.month':function () {
      this.$store.dispatch('statistics/getSmsPerMonth',this.form);
    },
    'form.year':function () {
      this.$store.dispatch('statistics/getSmsPerMonth',this.form);
    }
  }
};
</script>

<style lang="scss" scoped>
.statistics-page {
  padding: 1rem;
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.3rem;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.15);
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.15);
  }


  .sms-charts-card,
  .calls-charts-card {
    padding: 1rem;
    background-color: #ffffff;
    box-shadow: 0px 1px 22px -12px #607d8b;
    margin: 1rem 0;
  }
}
</style>
