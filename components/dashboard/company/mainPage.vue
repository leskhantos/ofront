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
        <div class="guest-charts-card">
          <guest :series="guestsSeries" :chartOptions="guestsChartOptions"/>
        </div>

        <oy-page-header title="Звонки"></oy-page-header>
        <div class="calls-charts-card">
          <calls :series="callsSeries" :chartOptions="callsChartOptions"/>
        </div>

        <oy-page-header title="Ваучеры"></oy-page-header>
        <div class="voucher-charts-card">
          <voucher/>
        </div>
      </oy-page-body>
    </oy-page>
</template>

<script>
  import guest from "../statistics/guest";
  import calls from "../statistics/calls";
  import voucher from '../statistics/voucher'
    export default {
      props: {
        company_id: {
          type: Number,
          required: true
        }
      },
        name: "mainPage",
      components:{
        guest,calls,voucher
      },
      data(){
          return{
              year: null,
              month: null
        }
      },
      computed:{
        years:function () {
          let currentYear = new Date().getFullYear(), years = [], startYear=2018;
          while ( startYear <= currentYear ) {
            years.push({id:startYear++});
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
          if(this.year == curYear){
            let currentYearsMonths=[]
            let currentMonth = new Date().getMonth()+1
            months.forEach(function (item) {
              if (item.id<=currentMonth){
                currentYearsMonths.push(item)
              }
            })
            return currentYearsMonths
          }else
            return months
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
      created() {
        let date = new Date();

        this.month = date.getMonth()+1
        this.year = date.getFullYear()
        let data = {
          month:  this.month,
          year:  this.year,
          company_id: this.company_id
        }
        this.$store.dispatch('statistics/getCallsByMonthPerMonth',data);
        this.$store.dispatch('statistics/getGuestsByMonthPerMonth',data);
      },
      watch:{
        month:function () {
          let data = {
            month:  this.month,
            year:  this.year,
            company_id: this.company_id
          }
          this.$store.dispatch('statistics/getCallsByMonthPerMonth',data);
          this.$store.dispatch('statistics/getGuestsByMonthPerMonth',data);


        },
        year:function () {
          let data = {
            month:  this.month,
            year:  this.year,
            company_id: this.company_id
          }
          this.$store.dispatch('statistics/getCallsByMonthPerMonth',data);
          this.$store.dispatch('statistics/getGuestsByMonthPerMonth',data);

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
