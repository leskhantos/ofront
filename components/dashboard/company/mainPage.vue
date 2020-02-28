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
          <voucher :series="vouchersSeries" :chartOptions="vouchersChartOptions" />
        </div>

        <company-pie-charts :callSeries="calls" :guest-series="guests" :device-series="devices" :browser-series="browsers" :os-series="os"/>
      </oy-page-body>
    </oy-page>
</template>

<script>
  import guest from "../statistics/guest";
  import calls from "../statistics/calls";
  import voucher from '../statistics/voucher'
  import companyPieCharts from "../statistics/companyPieCharts";
    export default {
      props: {
        company_id: {
          type: Number,
          required: false
        }
      },
        name: "mainPage",
      components:{
        guest,calls,voucher,companyPieCharts
      },
      data(){
          return{
              year: new Date().getFullYear(),
              month: new Date().getMonth()+1
        }
      },
      computed:{
        years:function () {
          let currentYear = new Date().getFullYear(), years = [], startYear=2018;
          while ( startYear <= currentYear ) {
            years.push({id: startYear++});
          }
          return years;
        },
        months:function(){
          let months = [
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
          let curYear = new Date().getFullYear()
          let currentMonth = new Date().getMonth()+1
          if(this.year == curYear){
            let currentYearsMonths=[]
            months.forEach(function (item) {
              if (item.id<=currentMonth){
                currentYearsMonths.push(item)
              }
            })
            return currentYearsMonths
          }else
            return months
        },
        calls:function(){
          let call = this.$store.getters['statistics/allCallsByCompany']
          let arr = [call.requests, call.checked]
          const isAllZero = arr.every(item => item === 0);
          if (isAllZero){
            return []
          }else {
            return arr
          }
        },
        guests:function(){
          let guest = this.$store.getters['statistics/allGuestsByCompany']
          let arr = [guest.load, guest.auth,guest.new, guest.old]
          const isAllZero = arr.every(item => item === 0);
          if (isAllZero){
            return []
          }else {
            return arr
          }
        },
        devices:function(){
          let device = this.$store.getters['statistics/allOsByCompany']
          let arr = [device.mobile, device.tablet, device.computer, device.type_other]
          const isAllZero = arr.every(item => item === 0);
          if (isAllZero){
            return []
          }else {
            return arr
          }
        },
        browsers:function(){
          let browser = this.$store.getters['statistics/allOsByCompany']
          let arr = [browser.android_browser, browser.edge, browser.firefox, browser.chrome,browser.opera,browser.safari,browser.yandex_browser,browser.webkit,browser.browser_other]
          const isAllZero = arr.every(item => item === 0);
          if (isAllZero){
            return []
          }else {
            return arr
          }
        },
        os:function(){
          let os = this.$store.getters['statistics/allOsByCompany']
          let arr = [os.android, os.linux, os.ios, os.windows, os.windows_phone,os.os_other]
          const isAllZero = arr.every(item => item === 0);
          if (isAllZero){
            return []
          }else {
            return arr
          }
        },
        callsSeries:function () {
          let data = this.$store.getters['statistics/callsByCompanyPerMonth']
          let map = new Map(Object.entries(data))
          let requests = []
          let checked = []
          map.forEach(value => {
            requests.push(value.requests)
            checked.push(value.checked)
          })
          return [
            {
              name: "Запросов",
              data: requests
            },
            {
              name: "Авторизаций",
              data: checked
            },
          ]

        },
        callsChartOptions:function () {
          return {
            chart: {
              height: 240,
              width:'100%',
              type: 'area'
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth'
            },
            xaxis: {
              categories: Object.keys(this.$store.getters['statistics/callsByCompanyPerMonth'])
            },
          }
        },
        guestsSeries:function () {
          let data = this.$store.getters['statistics/guestsByCompanyPerMonth']
          let map = new Map(Object.entries(data))
          let load = []
          let auth = []
          let newOnes = []
          let old = []
          map.forEach(value => {
            load.push(value.load)
            auth.push(value.auth)
            newOnes.push(value.new)
            old.push(value.old)
          })
          return [
            {
              name: "Загрузки",
              data: load
            },
            {
              name: "Авторизаций",
              data: auth
            },
            {
              name: "Новые",
              data: newOnes
            },
            {
              name: "Постоянные",
              data: old
            },
          ]

        },
        guestsChartOptions:function () {
          return {
            chart: {
              height: 240,
              width:'100%',
              type: 'area'
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth'
            },
            xaxis: {
              categories: Object.keys(this.$store.getters['statistics/guestsByCompanyPerMonth'])
            },
          }
        },
        vouchersSeries:function () {
          let data = this.$store.getters['statistics/vouchersByCompanyPerMonth']
          let map = new Map(Object.entries(data))
          let all = []
          let auth = []
          map.forEach(value => {
            all.push(value.all)
            auth.push(value.auth)
          })
          return [
            {
              name: "Всего",
              data: all
            },
            {
              name: "Авторизаций",
              data: auth
            }
          ]

        },
        vouchersChartOptions:function () {
          return {
            chart: {
              height: 240,
              width:'100%',
              type: 'area'
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth'
            },
            xaxis: {
              categories: Object.keys(this.$store.getters['statistics/vouchersByCompanyPerMonth'])
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
      watch:{
        month:{
          immediate: false,
          handler () {
            let data = {
              month:  this.month,
              year:  this.year,
              company_id: this.company_id
            }
            this.$store.dispatch('statistics/getAllByCompanyPerMonth',data);
          }
        },
        year:{
          immediate: false,
          handler () {
            let data = {
              month:  this.month,
              year:  this.year,
              company_id: this.company_id
            }
            this.$store.dispatch('statistics/getAllByCompanyPerMonth',data);
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
  .main-page{
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

  .guest-charts-card,
  .voucher-charts-card,
  .calls-charts-card {
    padding: 1rem;
    background-color: #ffffff;
    box-shadow: 0px 1px 22px -12px #607d8b;
    margin: 1rem 0;
  }
  }
</style>
