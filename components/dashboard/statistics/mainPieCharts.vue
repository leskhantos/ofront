<template>
  <div class="row ">
    <div class="col-lg-4" :style="{ borderRight: '1px solid rgba(0,0,0,.1)'}">
      <apexchart height="240" :options="calls.chartOptions" :series="calls.series"/>
    </div>
    <div class="col-lg-4" :style="{ borderRight: '1px solid rgba(0,0,0,.1)'}">
      <apexchart height="240" :options="sms.chartOptions" :series="sms.series"/>
    </div>
    <div class="col-lg-4">
      <apexchart height="240" :options="vouchers.chartOptions" :series="vouchers.series"/>
    </div>
  </div>
</template>

<script>
    export default {
        name: "mainPieCharts",
      data(){
          return{
            calls:{
              series: [44, 55],
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
            sms:{
              series: [44, 55,14],
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
            vouchers:{
              series: [44, 55],
              chartOptions: {
                labels: ["Запросов","Авторизаций"],
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
