<template>
  <oy-page>
    <div class="d-flex flex-wrap justify-content-end fixed-top">
        <oy-select
                   firstOption="Все зоны"
                   @childToParent="onChangeSpot"
                   :options="spots"
                   v-model="spot_id"
                   :disabled="false"
        />
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
    <oy-page-body >
      <oy-page-header title="Гости"></oy-page-header>
        <div v-if="spot_id==='all'"  >
          <guest class="guest-charts-card" :series="guestsSeries" :chartOptions="monthChartOptions" />
          <company-pie-charts v-if="spot_id==='all'" :guest-series="guests" :device-series="devices" :browser-series="browsers"
                              :os-series="os"/>
        </div>
        <div v-else  >
          <guest class="guest-charts-card" :series="guestsSeriesSpot" :chartOptions="monthChartOptionsSpot"/>
          <oy-page-header v-if="spotType===1" title="SMS"></oy-page-header>
          <oy-page-header v-else-if="spotType===2" title="Звонки"></oy-page-header>
          <oy-page-header v-else title="Ваучеры"></oy-page-header>
          <div class="voucher-charts-card" >
            <voucher :series="allStatsSeries" :chartOptions="monthChartOptionsSpot"/>
          </div>

          <spot-pie-charts :statSeries="stats" :statChartOptions="statChartOptions" :guest-series="guestsSpot"
                           :device-series="devicesSpot" :browser-series="browsersSpot"
                           :os-series="osSpot"/>
        </div>
    </oy-page-body>
  </oy-page>
</template>

<script>
  import guest from "@/components/dashboard/statistics/guest";
  import calls from "@/components/dashboard/statistics/calls";
  import voucher from "@/components/dashboard/statistics/voucher";
  import companyPieCharts from "@/components/dashboard/statistics/companyPieCharts";
  import spotPieCharts from "../../../../components/dashboard/statistics/spotPieCharts";

  export default {
    components: {guest, calls, voucher, companyPieCharts, spotPieCharts},
    data() {
      return {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        company_id: this.$route.params.id,
        spot_id: 'all'
      }
    },
    computed: {
      spotType: function () {
        return this.$store.getters['statistics/spotType']
      },
      years: function () {
        return this.$store.getters['app/get_years']
      },
      spots() {
        return this.$store.getters['spot/spotsByCompany']
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
      guests: function () {
        return this.$store.getters['statistics/allGuestsByCompany']
      },
      devices: function () {
        return this.$store.getters['statistics/allDevicesByCompany']
      },
      browsers: function () {
        return this.$store.getters['statistics/allBrowsersByCompany']
      },
      os: function () {
        return this.$store.getters['statistics/allOsByCompany']
      },
      guestsSpot: function () {
        return this.$store.getters['statistics/allGuestsBySpot']
      },
      devicesSpot: function () {
        return this.$store.getters['statistics/allDevicesBySpot']
      },
      browsersSpot: function () {
        return this.$store.getters['statistics/allBrowsersBySpot']
      },
      osSpot: function () {
        return this.$store.getters['statistics/allOsBySpot']
      },
      daysOfMonth() {
        let maxDay = this.$store.getters['statistics/daysInMonthByCompany']
        let days = []
        for (let i = 1; i <= maxDay; i++) {
          days.push(i);
        }
        return days;
      },
      daysOfMonthSpot() {
        let maxDay = this.$store.getters['statistics/daysInMonthBySpot']
        let days = []
        for (let i = 1; i <= maxDay; i++) {
          days.push(i);
        }
        return days;
      },
      guestsSeries: function () {
        return this.$store.getters['statistics/allGuestsByCompanyPerMonth']
      },
      guestsSeriesSpot: function () {
        return this.$store.getters['statistics/allGuestsBySpotPerMonth']
      },
      vouchersSeries: function () {
        return this.$store.getters['statistics/allVouchersByCompanyPerMonth']
      },
      stats: function () {
        return this.$store.getters['statistics/allStatsDataBySpot']
      },
      allStatsSeries: function () {
        return this.$store.getters['statistics/allStatsBySpotPerMonth']
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
      monthChartOptionsSpot: function () {
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
            categories: this.daysOfMonthSpot
          },
        }
      }
    },
    methods: {
      onChangeMonth(val) {
        this.month = val
      },
      onChangeYear(val) {
        this.year = val
      },
      onChangeSpot(val) {
        this.spot_id = val
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
          this.$store.dispatch('statistics/getAllDataByCompany', data);
          let spotData = {
            month: this.month,
            year: this.year,
            spot_id: this.spot_id
          }
          if (this.spot_id !== 'all') {
            this.$store.dispatch('statistics/getAllBySpotPerMonth', spotData);
            this.$store.dispatch('statistics/getAllDataBySpot', spotData);
          }
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
          this.$store.dispatch('statistics/getAllDataByCompany', data);
          let spotData = {
            month: this.month,
            year: this.year,
            spot_id: this.spot_id
          }
          if (this.spot_id !== 'all') {
            this.$store.dispatch('statistics/getAllBySpotPerMonth', spotData);
            this.$store.dispatch('statistics/getAllDataBySpot', spotData);
          }
        }
      },
      spot_id: {
        immediate: false,
        handler() {
          let spotData = {
            month: this.month,
            year: this.year,
            spot_id: this.spot_id
          }
          if (this.spot_id !== 'all') {
            this.$store.dispatch('statistics/getAllBySpotPerMonth', spotData);
            this.$store.dispatch('statistics/getAllDataBySpot', spotData);
          }
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
