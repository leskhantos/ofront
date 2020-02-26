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
      <oy-page-body :style="{  borderBottom: '1px solid rgba(0,0,0,.1)' }">
        <oy-page-header title="Гости"></oy-page-header>
        <div class="guest-charts-card">
          <guest/>
        </div>

        <oy-page-header title="Звонки"></oy-page-header>
        <div class="calls-charts-card">
          <calls/>
        </div>
      </oy-page-body>
    </oy-page>
</template>

<script>
  import guest from "../statistics/guest";
  import calls from "../statistics/calls";
    export default {
        name: "mainPage",
      components:{
        guest,calls
      },
      data(){
          return{
            form:{
              year: null,
              month: null
            },
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
          if(this.form.year == curYear){
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
      },
      methods:{
        onChangeMonth(val) {
          this.form.month = val
        },
        onChangeYear(val) {
          this.form.year = val
        },
      },
      created() {
        let date = new Date();

        this.form.month = date.getMonth()+1
        this.form.year = date.getFullYear()
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
  .calls-charts-card {
    padding: 1rem;
    background-color: #ffffff;
    box-shadow: 0px 1px 22px -12px #607d8b;
    margin: 1rem 0;
  }
  }
</style>
