<template>
  <oy-page>
    <div class="d-flex flex-wrap justify-content-end fixed-top">
        <oy-select
                   firstOption="Месяц"
                   @childToParent="onChangeMonth"
                   :options="months"
                   :selected="month"
                   v-model="month"
        />

        <oy-select
                   first-option="Год"
                   @childToParent="onChangeYear"
                   :options="years"
                   :selected="year"
                   v-model="year"
        />
    </div>
    <oy-page-body>
      <oy-page-header title="Гости"></oy-page-header>
      <div class="guest-charts-card" >
        <guest :series="guestsSeries" :chartOptions="monthChartOptions"/>
      </div>

      <oy-page-header v-if="spotType===1" title="SMS"></oy-page-header>
      <oy-page-header v-else-if="spotType===2" title="Звонки"></oy-page-header>
      <oy-page-header v-else title="Ваучеры"></oy-page-header>
      <div class="voucher-charts-card">
        <voucher :series="allStatsSeries" :chartOptions="monthChartOptions"/>
      </div>

      <spot-pie-charts class="spot-pie-charts-card" :statSeries="stats" :statChartOptions="statChartOptions" :guest-series="guests"
                       :device-series="devices" :browser-series="browsers"
                       :os-series="os"/>
    </oy-page-body>
  </oy-page>
</template>

<script>
  import guest from "@/components/dashboard/statistics/guest";
  import calls from "@/components/dashboard/statistics/calls";
  import voucher from "@/components/dashboard/statistics/voucher";
  import spotPieCharts from "@/components/dashboard/statistics/spotPieCharts";

  export default {
    components: {spotPieCharts, guest, calls, voucher},
    data() {
      return {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        spot_id: this.$route.params.sid
      }
    },
    created() {
      let date = new Date();
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      let data = {
        month: month,
        year: year,
        spot_id: this.$route.params.sid
      }
      this.$store.dispatch('statistics/getAllBySpotPerMonth', data);
      this.$store.dispatch('statistics/getAllDataBySpot', data);
    },
    methods: {
      onChangeMonth(val) {
        this.month = val
      },
      onChangeYear(val) {
        this.year = val
      },
    },
    computed: {
      spotType: function () {
        return this.$store.getters['statistics/spotType']
      },
      years: function () {
        return this.$store.getters['app/get_years']
      },
      months: function () {
        let months = this.$store.getters['app/get_months']
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
      stats: function () {
        return this.$store.getters['statistics/allStatsDataBySpot']
      },
      guests: function () {
        return this.$store.getters['statistics/allGuestsBySpot']
      },
      devices: function () {
        return this.$store.getters['statistics/allDevicesBySpot']
      },
      browsers: function () {
        return this.$store.getters['statistics/allBrowsersBySpot']
      },
      os: function () {
        return this.$store.getters['statistics/allOsBySpot']
      },
      daysOfMonth() {
        let maxDay = this.$store.getters['statistics/daysInMonthBySpot']
        let days = []
        for (let i = 1; i <= maxDay; i++) {
          days.push(i);
        }
        return days;
      },
      allStatsSeries: function () {
        return this.$store.getters['statistics/allStatsBySpotPerMonth']
      },
      guestsSeries: function () {
        return this.$store.getters['statistics/allGuestsBySpotPerMonth']
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
      statChartOptions: function () {
        if (this.spotType === 1) {
          return {
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
          }
        } else if (this.spotType === 2) {
          return {
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
          }
        } else {
          return {
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
          }
        }
      }
    },
    watch: {
      month: {
        immediate: false,
        handler() {
          let data = {
            month: this.month,
            year: this.year,
            spot_id: this.spot_id
          }
          this.$store.dispatch('statistics/getAllBySpotPerMonth', data);
          this.$store.dispatch('statistics/getAllDataBySpot', data);

        }
      },
      year: {
        immediate: false,
        handler() {
          let data = {
            month: this.month,
            year: this.year,
            spot_id: this.spot_id
          }
          this.$store.dispatch('statistics/getAllBySpotPerMonth', data);
          this.$store.dispatch('statistics/getAllDataBySpot', data);

        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .fixed-top{
    position:absolute;
    top: 130px;
    left: auto;
    right: 1.7rem;
    overflow: hidden;
  }
  .guest-charts-card,
  .voucher-charts-card{
    padding: 1rem;
    background-color: #ffffff;
    box-shadow: 0px 1px 22px -12px #607d8b;
    margin: 1rem 0;
  }
</style>
