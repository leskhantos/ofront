<template>
  <div class="row ">
    <div class="col-lg-4" :style="{ borderRight: '1px solid rgba(0,0,0,.1)'}">
      <apexchart ref="pie" type="donut" height="240" :options="callsChartOptions" :series="callsSeries"/>
    </div>
    <div class="col-lg-4" :style="{ borderRight: '1px solid rgba(0,0,0,.1)'}">
      <apexchart ref="pie" type="donut" height="240" :options="smsChartOptions" :series="smsSeries"/>
    </div>
    <div class="col-lg-4">
      <apexchart ref="pie" type="donut" height="240" :options="vouchersChartOptions" :series="vouchersSeries"/>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      callsSeries: {
        type: Array,
        required: true
      },
      smsSeries: {
        type: Array,
        required: true
      },
      vouchersSeries: {
        type: Array,
        required: true
      },
    },
    data() {
      return {
        smsChartOptions: {
          labels: ["Доставлено", "Всего", "Повтор"],
          chart: {
            type: 'donut',
          },
          title: {
            text: "SMS",
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
            breakpoint: 480,
            options: {
              chart: {
                width: 200
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
        callsChartOptions: {
          chart: {
            type: 'donut',
          },
          title: {
            text: "Звонки",
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
          labels: ["Запросов", "Авторизаций"],
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
          }],
          noData: {
            text: "Данных нет",
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0
          }
        },
        vouchersChartOptions: {
          labels: ["Всего", "Авторизаций"],
          chart: {
            type: 'donut',
          },
          title: {
            text: "Ваучеры",
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
            breakpoint: 480,
            options: {
              chart: {
                width: 200
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
        this.$refs.pie.resetSeries()
      }
    }
  }
</script>

<style scoped>

</style>
