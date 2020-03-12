<template>
  <oy-page>
    <div class="d-flex">
      <div class="d-flex mr-auto">
        <oy-input @sendEnter="sendSearch" :style="{ paddingRight:'1.2rem', width:'25rem'}" v-model="request"/>
        <oy-button :style="{marginBottom:'1.2rem', width:'10rem'}" buttonType="submit"
                   type="submit"
                   class="btn btn-success"
                   :block="true"
                   title="Обновить"
                   :svgIcon="'FilterIcon'"
                   @click="sendSearch"
        />
      </div>
      <div class="d-flex ml-auto">
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
    </div>
    <oy-page-body>
      <table v-show="this.spot.type===2" class="table table-striped">
        <thead>
        <tr>
          <th>Дата и время</th>
          <th>Номер телефона</th>
          <th>Устройство</th>
          <th>Статус</th>
        </tr>
        </thead>
        <tbody v-if="dataList">
        <tr v-for="call in dataList">
          <td>{{call.created}}</td>
          <td>{{call.phone}}</td>
          <td>{{call.device_mac}}</td>
          <td>
            <oy-dot :active-color="call.checked ? '#37a967': 'red'"/>
          </td>
        </tr>
        <tr v-if="!dataList.length" class="no-data text-center">
          <td colspan="14">Нет данных</td>
        </tr>
        </tbody>
      </table>
      <table v-show="this.spot.type===1" class="table table-striped">
        <thead>
        <tr>
          <th>Дата и время</th>
          <th>Номер телефона</th>
          <th>Цена</th>
          <th>Статус</th>
        </tr>
        </thead>
        <tbody v-if="dataList">
        <tr v-for="sms in dataList">
          <td>{{sms.dt_request}}</td>
          <td>
            <div>{{ sms.phone }} </div>
            <div><small> {{sms.country + ',' + sms.operator}} </small></div>
          </td>
          <td>{{sms.price}}</td>
          <td>
            <div>{{ sms.status }} </div>
            <div><small> {{ sms.dt_check }} </small></div>
          </td>
        </tr>
        <tr v-if="!dataList.length" class="no-data text-center">
          <td colspan="14">Нет данных</td>
        </tr>
        </tbody>
      </table>
      <table-pagination v-show="perPage < total" :listData="dataList"
                        :pageNumber="currentPage"
                        :size="perPage"
                        :total="total"
                        @prevPage="prevPage"
                        @nextPage="nextPage"
                        @page="selPage"
      />
    </oy-page-body>
  </oy-page>
</template>

<script>
  import devicesIcon from "@/components/icons/devicesIcon";
  import tablePagination from "@/components/dashboard/company/tablePagination";

  export default {
    components: {devicesIcon, tablePagination},
    data() {
      return {
        request: '',
        spot_id: this.$route.params.sid,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        page: 1
      }
    },
    created() {
      let date = new Date();
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      let data = {
        month: month,
        year: year,
        spot_id: this.$route.params.sid,
        query: this.request,
        page: this.page
      }
      this.$store.dispatch('spot/getCallsBySpot', data);
      this.$store.dispatch('spot/getSmsBySpot', data);
    },
    methods: {
      onChangeMonth(val) {
        this.month = val
      },
      onChangeYear(val) {
        this.year = val
      },
      prevPage(val) {
        this.page = val
        let data = {
          month: this.month,
          year: this.year,
          spot_id: this.spot_id,
          query: this.request,
          page: this.page - 1
        }
        this.$store.dispatch('spot/getCallsBySpot', data);
        this.$store.dispatch('spot/getSmsBySpot', data);

      },
      nextPage(val) {
        this.page = val
        let data = {
          month: this.month,
          year: this.year,
          spot_id: this.spot_id,
          query: this.request,
          page: this.page + 1
        }
        this.$store.dispatch('spot/getCallsBySpot', data);
        this.$store.dispatch('spot/getSmsBySpot', data);

      },
      selPage(val) {
        this.page = val
        let data = {
          month: this.month,
          year: this.year,
          spot_id: this.spot_id,
          query: this.request,
          page: this.page
        }
        this.$store.dispatch('spot/getCallsBySpot', data);
        this.$store.dispatch('spot/getSmsBySpot', data);

      },
      sendSearch() {
        let data = {
          month: this.month,
          year: this.year,
          spot_id: this.spot_id,
          query: this.request,
          page: 1
        }
        this.$store.dispatch('spot/getCallsBySpot', data);
        this.$store.dispatch('spot/getSmsBySpot', data);

      }
    },
    computed: {
      spot: function () {
        return this.$store.getters['spot/spot']
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
      dataList() {
        if (this.spot.type === 2) {
          return this.$store.getters['spot/callsBySpot']
        } else {
          return this.$store.getters['spot/smsBySpot']
        }
      },
      currentPage() {
        if (this.spot.type === 2) {
          return this.$store.getters['spot/callsBySpotCurrentPage']
        } else {
          return this.$store.getters['spot/smsBySpotCurrentPage']
        }
      },
      perPage() {
        if (this.spot.type === 2) {
          return this.$store.getters['spot/callsBySpotPerPage']
        } else {
          return this.$store.getters['spot/smsBySpotPerPage']
        }
      },
      total() {
        if (this.spot.type === 2) {
          return this.$store.getters['spot/callsBySpotTotal']
        } else {
          return this.$store.getters['spot/smsBySpotTotal']
        }
      },
    },
    watch: {
      month: {
        immediate: false,
        handler() {
          let data = {
            month: this.month,
            year: this.year,
            spot_id: this.spot_id,
            query: this.request,
            page: this.page
          }
          this.$store.dispatch('spot/getCallsBySpot', data);
          this.$store.dispatch('spot/getSmsBySpot', data);

        }
      },
      year: {
        immediate: false,
        handler() {
          let data = {
            month: this.month,
            year: this.year,
            spot_id: this.spot_id,
            query: this.request,
            page: this.page
          }
          this.$store.dispatch('spot/getCallsBySpot', data);
          this.$store.dispatch('spot/getSmsBySpot', data);

        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  button.page-link {
    display: inline-block;
  }

  button.page-link {
    font-size: 20px;
    color: #29b3ed;
    font-weight: 500;
  }

  .offset {
    width: 500px !important;
    margin: 20px auto;
  }
</style>
