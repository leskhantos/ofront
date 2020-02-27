<template>
  <div class="row ">
    <div class="col-lg-4" :style="{ borderRight: '1px solid rgba(0,0,0,.1)'}">
      <apexchart height="240" :options="calls.chartOptions" :series="callsSeries"/>
    </div>
    <div class="col-lg-4" :style="{ borderRight: '1px solid rgba(0,0,0,.1)'}">
      <apexchart height="240" :options="sms.chartOptions" :series="smsSeries"/>
    </div>
    <div class="col-lg-4">
      <apexchart height="240" :options="vouchers.chartOptions" :series="vouchersSeries"/>
    </div>
  </div>
</template>

<script>
    export default {
      props:{
        callsSeries:{
          type: Array,
          required:false
        },
        smsSeries: {
          type: Array,
          required:false
        },
        vouchersSeries: {
          type: Array,
          required:false
        },
      },
      data(){
        return {
          sms:{
            chartOptions: {
              labels: ["Доставлено","Всего","Повтор"],
              chart: {
                type: 'donut',
              },
              title: {
                text: "SMS",
                margin:30,
                style: {
                  fontSize:  '20px',
                  fontWeight:  'bold',
                },
              },
              plotOptions:{
                pie:{
                  expandOnClick: true,
                  donut:{
                    size:'40%'
                  }
                }
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            },
          },
          calls:{
            chartOptions: {
              chart: {
                type: 'donut',
              },
              title: {
                text: "Звонки",
                margin:30,
                style: {
                  fontSize:  '20px',
                  fontWeight:  'bold',
                },
              },
              plotOptions:{
                pie:{
                  expandOnClick: true,
                  donut:{
                    size:'40%'
                  }
                }
              },
              labels: ["Запросов","Авторизаций"],
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            },
          },
          vouchers:{
            chartOptions: {
              labels: ["Всего","Авторизаций"],
              chart: {
                type: 'donut',
              },
              title: {
                text: "Ваучеры",
                margin:30,
                style: {
                  fontSize:  '20px',
                  fontWeight:  'bold',
                },
              },
              plotOptions:{
                pie:{
                  expandOnClick: true,
                  donut:{
                    size:'40%'
                  }
                }
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            },
          }
        }
      }
    }
</script>

<style scoped>

</style>
