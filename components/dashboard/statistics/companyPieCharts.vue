<template>
  <div>
    <div class="row two-donuts">
      <div class="col">
        <apexchart ref="don" type="donut" height="240" :options="deviceChartOptions" :series="deviceSeries"/>
      </div>

      <div class="col" :style="{ borderLeft: '1px solid rgba(0,0,0,.1)'}">
        <apexchart ref="don" type="donut" height="240" :options="guestChartOptions" :series="guestSeries"/>
      </div>
    </div>
    <div class="row two-donuts" >
      <div class="col">
        <apexchart ref="don" type="donut" height="240" :options="osChartOptions" :series="osSeries"/>
      </div>
      <div class="col" :style="{ borderLeft: '1px solid rgba(0,0,0,.1)'}">
        <apexchart ref="don" type="donut" height="240" :options="browserChartOptions" :series="browserSeries"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      deviceSeries: {
        type: Array,
        required: false
      },
      guestSeries: {
        type: Array,
        required: false
      },
      osSeries: {
        type: Array,
        required: false
      },
      browserSeries: {
        type: Array,
        required: false
      },
    },
    data() {
      return {
        deviceChartOptions: {
          labels: ["Мобильные", "Планшеты", "Компьютеры", "Другое"],
          chart: {
            type: 'donut',
          },
          title: {
            text: "Устройства",
            margin: 30,
            style: {
              fontSize: '20px',
              fontWeight: 'bold',
            },
          },
          plotOptions: {
            pie: {
              expandOnClick: true,
              donut: {
                size: '40%'
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
            text: "Данных нет",
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0
          }
        },
        guestChartOptions: {
          labels: ["Загрузки", "Авторизации", "Новые", "Постоянные"],
          chart: {
            type: 'donut',
          },
          title: {
            text: "Гости",
            margin: 30,
            style: {
              fontSize: '20px',
              fontWeight: 'bold',
            },
          },
          plotOptions: {
            pie: {
              expandOnClick: true,
              donut: {
                size: '40%'
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
            text: "Данных нет",
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0
          }
        },
        osChartOptions: {
          labels: ["Android", "Linux", "iOS", "Windows", "Windows Phone", "Другое"],
          chart: {
            type: 'donut',
          },
          colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800', '#D9534F'],
          title: {
            text: "Операционные системы",
            margin: 30,
            style: {
              fontSize: '20px',
              fontWeight: 'bold',
            },
          },
          plotOptions: {
            pie: {
              expandOnClick: true,
              donut: {
                size: '40%'
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
            text: "Данных нет",
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0
          }
        },
        browserChartOptions: {
          labels: ["Android", "Edge", "Firefox", "Chrome", "Opera", "Safari", "Yandex", "Webkit", "Другое"],
          chart: {
            type: 'donut',
          },
          colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800', '#D9534F', '#FFFF00', '#00FFFF', '#FF00FF'],
          title: {
            text: "Браузеры",
            margin: 30,
            style: {
              fontSize: '20px',
              fontWeight: 'bold',
            },
          },
          plotOptions: {
            pie: {
              expandOnClick: true,
              donut: {
                size: '40%'
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
            text: "Данных нет",
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0
          }
        },
      }
    },
    watch: {
      '$route.path': function () {
        this.$refs.don.resetSeries()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .two-donuts{
    padding: 1rem;
    background-color: #ffffff;
    box-shadow: 0px 1px 22px -12px #607d8b;
    margin: 1rem 0;
  }
</style>
