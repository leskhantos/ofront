<template>
  <oy-page>
    <div class="row">
      <div class="col-lg-8">
      </div>
      <div class="col-lg-4 float-right row">
        <oy-select class="col"
                   firstOption="Месяц"
                   @childToParent="onChangeMonth"
                   :options="months"
                   :selected="month"
                   v-model="month"
        />

        <oy-select class="col"
                   first-option="Год"
                   @childToParent="onChangeYear"
                   :options="years"
                   :selected="year"
                   v-model="year"
        />
      </div>
    </div>
    <oy-page-body :style="{  borderBottom: '1px solid rgba(0,0,0,.1)' }">
      <oy-page-header title="Гости"></oy-page-header>
      <div class="guest-charts-card" :style="{  borderBottom: '3px solid rgba(0,0,0,.1)' }">
        <guest :series="guestsSeries" :chartOptions="guestsChartOptions"/>
      </div>

      <oy-page-header title="Звонки"></oy-page-header>
      <div class="calls-charts-card" :style="{  borderBottom: '3px solid rgba(0,0,0,.1)' }">
        <calls :series="callsSeries" :chartOptions="callsChartOptions"/>
      </div>

      <oy-page-header title="Ваучеры"></oy-page-header>
      <div class="voucher-charts-card" :style="{  borderBottom: '3px solid rgba(0,0,0,.1)' }">
        <voucher :series="vouchersSeries" :chartOptions="vouchersChartOptions"/>
      </div>

      <company-pie-charts :callSeries="calls" :guest-series="guests" :device-series="devices" :browser-series="browsers"
                          :os-series="os"/>
    </oy-page-body>
  </oy-page>

</template>

<script>
  import guest from "../../../../components/dashboard/statistics/guest";
  import calls from "../../../../components/dashboard/statistics/calls";
  import voucher from "../../../../components/dashboard/statistics/voucher";
  import companyPieCharts from "../../../../components/dashboard/statistics/companyPieCharts";
    export default {
      components:{guest,calls,voucher,companyPieCharts},
      data(){
          return{
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            company_id: this.$route.params.id
          }
      },
      computed:{
        years: function () {
          let currentYear = new Date().getFullYear(), years = [], startYear = 2018;
          while (startYear <= currentYear) {
            years.push({id: startYear++});
          }
          return years;
        },
        months: function () {
          let months = [
            {id: 1, name: 'Январь'},
            {id: 2, name: 'Февраль'},
            {id: 3, name: 'Март'},
            {id: 4, name: 'Апрель'},
            {id: 5, name: 'Май'},
            {id: 6, name: 'Июнь'},
            {id: 7, name: 'Июль'},
            {id: 8, name: 'Август'},
            {id: 9, name: 'Сентябрь'},
            {id: 10, name: 'Октябрь'},
            {id: 11, name: 'Ноябрь'},
            {id: 12, name: 'Декабрь'},
          ]
          let curYear = new Date().getFullYear()
          let currentMonth = new Date().getMonth() + 1
          if (this.year == curYear) {
            let currentYearsMonths = []
            months.forEach(function (item) {
              if (item.id <= currentMonth) {
                currentYearsMonths.push(item)
              }
            })
            return currentYearsMonths
          } else
            return months
        },
        calls: function () {
          return this.$store.getters['statistics/allCallsByCompany']
        },
        guests: function () {
          return this.$store.getters['statistics/allGuestsByCompany']
        },
        devices: function () {
          return  this.$store.getters['statistics/allDevicesByCompany']
        },
        browsers: function () {
          return  this.$store.getters['statistics/allBrowsersByCompany']
        },
        os: function () {
          return this.$store.getters['statistics/allOsByCompany']
        },
        daysOfMonth(){
          let maxDay = this.$store.getters['statistics/daysInMonthByCompany']
          let days = []
          for(let i = 1; i <= maxDay; i++){
            days.push(i);
          }
          return days;
        },
        callsSeries: function () {
          return this.$store.getters['statistics/allCallsByCompanyPerMonth']
        },
        callsChartOptions: function () {
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
        guestsSeries: function () {
          return this.$store.getters['statistics/allGuestsByCompanyPerMonth']
        },
        guestsChartOptions: function () {
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
        vouchersSeries: function () {
          return this.$store.getters['statistics/allVouchersByCompanyPerMonth']
        },
        vouchersChartOptions: function () {
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
        }
      },
      methods:{
        onChangeMonth(val) {
          this.month = val
        },
        onChangeYear(val) {
          this.year = val
        },
      },
      watch: {
        month: {
          immediate: false,
          handler() {
            let data = {
              month: this.month,
              year: this.year,
              company_id: this.company_id
            }
            this.$store.dispatch('statistics/getAllByCompanyPerMonth', data);
          }
        },
        year: {
          immediate: false,
          handler() {
            let data = {
              month: this.month,
              year: this.year,
              company_id: this.company_id
            }
            this.$store.dispatch('statistics/getAllByCompanyPerMonth', data);
          }
        }
      }

    }
</script>

<style scoped>

</style>
