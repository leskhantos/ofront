<template>
  <div class="statistics-page">
    <div class="statistics-page_metric-items d-flex flex-wrap">
      <metric title="Компании" :number="stats.count_company" :currentIcon="'companyIcon'"/>
      <metric title="Зон" :number="stats.count_spot" :currentIcon="'SpotIcon'"/>
      <metric title="Персональных страниц" :number="stats.pages" :currentIcon="'pageIcon'"/>
      <metric title="Сохраненных устройств" :number="stats.count_all_device" :currentIcon="'devicesIcon'"/>
      <metric title="Новых устройств" :number="stats.count_new_device" :currentIcon="'newDeviceIcon'"/>
      <metric title="Авторизованных гостей" :number="stats.auth_guest" :currentIcon="'authGuestIcon'"/>
      <metric title="Актуальных сессий" :number="stats.session" :currentIcon="'actualSessionIcon'"/>
    </div>
    <oy-page>
      <div class="d-flex justify-content-end">
          <oy-select
                     firstOption="Месяц"
                     @childToParent="onChangeMonth"
                     :options="months"
                     :selected="form.month"
                     v-model="form.month"
          />

          <oy-select
                     first-option="Год"
                     @childToParent="onChangeYear"
                     :options="years"
                     :selected="form.year"
                     v-model="form.year"
          />
        </div>
      <oy-page-body>
        <oy-page-header title="Звонки"></oy-page-header>
        <div class="calls-charts-card">
          <calls :series="callsSeries" :chartOptions="monthChartOptions"/>
        </div>

        <oy-page-header title="SMS"></oy-page-header>
        <div class="sms-charts-card">
          <sms :series="smsSeries" :chartOptions="monthChartOptions"/>
        </div>

        <oy-page-header title="Ваучеры"></oy-page-header>
        <div class="voucher-charts-card">
          <voucher :series="vouchersSeries" :chartOptions="monthChartOptions"/>
        </div>


        <oy-page-header title=""></oy-page-header>
        <div class="donuts-charts-card">
          <main-pie-charts  :callsSeries="calls" :smsSeries="sms" :vouchersSeries="vouchers"/>
        </div>
      </oy-page-body>
    </oy-page>
  </div>
</template>

<script>
  import sms from "@/components/dashboard/statistics/sms.vue";
  import calls from "@/components/dashboard/statistics/calls.vue";
  import metric from "@/components/dashboard/statistics/metrica.vue";
  import voucher from "@/components/dashboard/statistics/voucher.vue";
  import MainPieCharts from "@/components/dashboard/statistics/mainPieCharts.vue";

  export default {
    layout: "dashboard",
    data() {
      return {
        form: {
          year: null,
          month: null,
        }
      }
    },
    metaInfo() {
      return {
        titleTemplate: "%s | Статистика"
      };
    },
    created() {
      let date = new Date();

      this.form.month = date.getMonth() + 1
      this.form.year = date.getFullYear()
      this.$store.dispatch('statistics/getAllStats');
      this.$store.dispatch('statistics/getAllPerMonth', this.form);
    },

    methods: {
      onChangeMonth(val) {
        this.form.month = val
      },
      onChangeYear(val) {
        this.form.year = val
      },
    },
    computed: {
      stats: function () {
        return this.$store.getters['statistics/stats']
      },
      daysOfMonth() {
        let maxDay = this.$store.getters['statistics/daysInMonth']
        let days = []
        for (let i = 1; i <= maxDay; i++) {
          days.push(i);
        }
        return days;
      },
      sms: function () {
        let sms = this.$store.getters['statistics/stats'].sms
        if(sms===0){
          return []
        } else {
          // return [sms.delivered, sms.all_sms, sms.resend]
        }
      },
      calls: function () {
        const call = this.stats.call
        console.log(this.$store.getters['statistics/stats'])
        return call !== 0 ? [call.requests, call.checked] : []
        // let call = this.$store.getters['statistics/stats']
        // console.log(this.$store.getters['statistics/stats'])
        // console.log(call)
        // if(call===0){
        //   return []
        // }else {
        //   return [call.requests, call.checked]
        // }
      },
      vouchers: function () {
        let vouchers = this.$store.getters['statistics/stats'].voucher
        if(vouchers===0){
          return []
        }else {
          // return [vouchers.all_vouchers, vouchers.auth]
        }
      },
      years: function () {
        return this.$store.getters['app/get_years']
      },
      months: function () {
        let months = this.$store.getters['app/get_months']
        let curYear = new Date().getFullYear()
        if (this.form.year == curYear) {
          let currentYearsMonths = []
          let currentMonth = new Date().getMonth() + 1
          months.forEach(function (item) {
            if (item.id <= currentMonth) {
              currentYearsMonths.push(item)
            }
          })
          return currentYearsMonths
        } else
          return months
      },
      smsSeries: function () {
        return this.$store.getters['statistics/allSmsStatsPerMonth']
      },
      callsSeries: function () {
        return this.$store.getters['statistics/allCallsStatsPerMonth']
      },
      vouchersSeries: function () {
        return this.$store.getters['statistics/allVouchersStatsPerMonth']
      },
      monthChartOptions: function () {
        return {
          chart: {
            height: 240,
            width: '100%',
            type: 'area'
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            categories: this.daysOfMonth
          },
        }
      },
    },
    components: {
      MainPieCharts,
      sms,
      calls,
      metric,
      voucher
    },
    watch: {
      'form.month': {
        immediate: false,
        handler() {
          this.$store.dispatch('statistics/getAllPerMonth', this.form);
        }
      },
      'form.year': {
        immediate: false,
        handler() {
          this.$store.dispatch('statistics/getAllPerMonth', this.form);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .statistics-page {
    padding: 1rem;
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
    .voucher-charts-card,
    .donuts-charts-card,
    .calls-charts-card {
      padding: 1rem;
      background-color: #ffffff;
      box-shadow: 0px 1px 22px -12px #607d8b;
      margin: 1rem 0;
    }
  }
</style>
