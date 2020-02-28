<template>
  <div>
    <div class="row ">
      <div class="col" :style="{ borderRight: '1px solid rgba(0,0,0,.1)'}">
        <apexchart height="240" :options="device.chartOptions" :series="deviceSeries"/>
      </div>

      <div class="col" :style="{ borderRight: '1px solid rgba(0,0,0,.1)'}">
        <apexchart height="240" :options="call.chartOptions" :series="callSeries"/>
      </div>

      <div class="col" :style="{ borderRight: '1px solid rgba(0,0,0,.1)'}">
        <apexchart height="240" :options="guest.chartOptions" :series="guestSeries"/>
      </div>
    </div>
    <div class="row" :style="{ borderTop: '1px solid rgba(0,0,0,.1)'}">
      <div class="col" :style="{ borderRight: '1px solid rgba(0,0,0,.1)'}">
        <apexchart height="240" :options="os.chartOptions" :series="osSeries"/>
      </div>
      <div class="col">
        <apexchart height="240" :options="browser.chartOptions" :series="browserSeries"/>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      props:{
        callSeries:{
          type: Array,
          required:false
        },
        deviceSeries:{
          type: Array,
          required:false
        },
        guestSeries:{
          type: Array,
          required:false
        },
        osSeries:{
          type: Array,
          required:false
        },
        browserSeries:{
          type: Array,
          required:false
        },
      },
      data(){
        return{
          device:{
            chartOptions: {
              labels: ["Мобильные","Планшеты","Компьютеры","Другое"],
              chart: {
                type: 'donut',
              },
              title: {
                text: "Устройства",
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
                breakpoint: 200,
                options: {
                  chart: {
                    width: 100
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }],
              noData: {
                text: "Нет данных",
                align: 'center',
                verticalAlign: 'middle',
                offsetX: 0,
                offsetY: 0
              }
            },
          },
          call:{
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
                breakpoint: 200,
                options: {
                  chart: {
                    width: 100
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }],
              noData: {
                text: "Нет данных",
                align: 'center',
                verticalAlign: 'middle',
                offsetX: 0,
                offsetY: 0
              }
            },
          },
          guest:{
            chartOptions: {
              labels: ["Загрузки","Авторизации","Новые","Постоянные"],
              chart: {
                type: 'donut',
              },
              title: {
                text: "Гости",
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
                breakpoint: 200,
                options: {
                  chart: {
                    width: 100
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }],
              noData: {
                text: "Нет данных",
                align: 'center',
                verticalAlign: 'middle',
                offsetX: 0,
                offsetY: 0
              }
            },
          },
          os:{
            chartOptions: {
              labels: ["Android","Linux","iOS","Windows","Windows Phone","Другое"],
              chart: {
                type: 'donut',
              },
              colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800','#D9534F'],
              title: {
                text: "Операционные системы",
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
                breakpoint: 200,
                options: {
                  chart: {
                    width: 100
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }],
              noData: {
                text: "Нет данных",
                align: 'center',
                verticalAlign: 'middle',
                offsetX: 0,
                offsetY: 0
              }
            },
          },
          browser:{
            chartOptions: {
              labels: ["Android","Edge","Firefox","Chrome","Opera","Safari","Yandex","Webkit","Другое"],
              chart: {
                type: 'donut',
              },
              colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800','#D9534F','#FFFF00','#00FFFF','#FF00FF'],
              title: {
                text: "Браузеры",
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
                breakpoint: 200,
                options: {
                  chart: {
                    width: 100
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }],
              noData: {
                text: "Нет данных",
                align: 'center',
                verticalAlign: 'middle',
                offsetX: 0,
                offsetY: 0
              }
            },
          }
        }
      }
   }
</script>

<style scoped>

</style>
