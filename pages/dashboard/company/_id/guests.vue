<template>
  <oy-page>
    <div class="row">
      <div class="col-lg-4">
      </div>
      <div class="col-lg-8 float-right row">
        <oy-select class="col-lg-8"
                   firstOption="Все зоны"
                   @childToParent="onChangeSpot"
                   :options="spots"
                   v-model="spot_id"
                   :disabled="false"
        />
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
    <oy-page-body :style="{ borderBottom: '1px solid rgba(0,0,0,.1)' }">
      <div v-if="spot_id==='all'">
        <table class="table table-striped" >
          <thead>
          <tr>
            <th scope="col">Дата и время</th>
            <th scope="col">Гость</th>
            <th scope="col">Авторизация</th>
            <th scope="col" style="text-align: center">Визиты</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="guest in guests" :key="guest.id">
            <td>{{guest.datetime}}</td>
            <td>
              <devices-icon/>
              {{guest.device_mac}}
            </td>
            <td>{{guest.data_auth}}</td>
            <td style="text-align: center">{{guest.sessions}}</td>
          </tr>
          </tbody>
        </table>
        <table-pagination :listData="guests"
                          :pageNumber="guestsCurrentPage"
                          :size="guestsPerPage"
                          :total="guestsTotal"
                          @prevPage="prevPage"
                          @nextPage="nextPage"
                          @page="selPage"
        />
      </div>
      <div v-else>
        <table class="table table-striped">
          <thead>
          <tr>
            <th scope="col">Дата и время</th>
            <th scope="col">Гость</th>
            <th scope="col">Авторизация</th>
            <th scope="col" style="text-align: center">Визиты</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="guest in guestsBySpot" :key="guest.id">
            <td>{{guest.datetime}}</td>
            <td>
              <devices-icon/>
              {{guest.device_mac}}
            </td>
            <td>{{guest.data_auth}}</td>
            <td style="text-align: center">{{guest.sessions}}</td>
          </tr>
          </tbody>
        </table>
        <table-pagination :listData="guestsBySpot"
                          :pageNumber="guestsCurrentPage"
                          :size="guestsPerPage"
                          :total="guestsTotal"
                          @prevPage="prevPage"
                          @nextPage="nextPage"
                          @page="selPage"
        />
      </div>

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
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        company_id: this.$route.params.id,
        spot_id: 'all',
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
        company_id: this.$route.params.id,
        page:1
      }
      this.$store.dispatch('spot/getSpotsByCompany', this.$route.params.id);
      this.$store.dispatch('guest/getGuestsByCompany', data);
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
      prevPage(val){
        this.page = val
        if (this.spot_id !== 'all') {
          let spotData = {
            month: this.month,
            year: this.year,
            spot_id: this.spot_id,
            page:this.page-1
          }
          this.$store.dispatch('guest/getGuestsBySpot', spotData);
        } else {
          let data = {
            month: this.month,
            year: this.year,
            company_id: this.company_id,
            page:this.page-1
          }
          this.$store.dispatch('guest/getGuestsByCompany', data);
        }
      },
      nextPage(val){
        this.page = val
        if (this.spot_id !== 'all') {
          let spotData = {
            month: this.month,
            year: this.year,
            spot_id: this.spot_id,
            page:this.page+1
          }
          this.$store.dispatch('guest/getGuestsBySpot', spotData);
        } else {
          let data = {
            month: this.month,
            year: this.year,
            company_id: this.company_id,
            page:this.page+1
          }
          this.$store.dispatch('guest/getGuestsByCompany', data);
        }
      },
      selPage(val){
        this.page = val
        if (this.spot_id !== 'all') {
          let spotData = {
            month: this.month,
            year: this.year,
            spot_id: this.spot_id,
            page:this.page
          }
          this.$store.dispatch('guest/getGuestsBySpot', spotData);
        } else {
          let data = {
            month: this.month,
            year: this.year,
            company_id: this.company_id,
            page:this.page
          }
          this.$store.dispatch('guest/getGuestsByCompany', data);
        }
      },
    },
    computed: {
      years: function () {
        return this.$store.getters['app/get_years']
      },
      spots() {
        return this.$store.getters['spot/spotsByCompany']
      },
      guests() {
        return this.$store.getters['guest/guestsByCompany']
      },
      guestsBySpot() {
        return this.$store.getters['guest/guestsBySpot']
      },
      guestsCurrentPage(){
        return this.$store.getters['guest/guestsCurrentPage']
      },
      guestsPerPage(){
        return this.$store.getters['guest/guestsPerPage']
      },
      guestsTotal(){
        return this.$store.getters['guest/guestsTotal']
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
    },
    watch: {
      month: {
        immediate: false,
        handler() {
          if (this.spot_id !== 'all') {
            let spotData = {
              month: this.month,
              year: this.year,
              spot_id: this.spot_id,
              page: this.page
            }
            this.$store.dispatch('guest/getGuestsBySpot', spotData);
          } else {
            let data = {
              month: this.month,
              year: this.year,
              company_id: this.company_id,
              page: this.page
            }
            this.$store.dispatch('guest/getGuestsByCompany', data);
          }
        }
      },
      year: {
        immediate: false,
        handler() {
          if (this.spot_id !== 'all') {
            let spotData = {
              month: this.month,
              year: this.year,
              spot_id: this.spot_id,
              page: this.page
            }
            this.$store.dispatch('guest/getGuestsBySpot', spotData);
          } else {
            let data = {
              month: this.month,
              year: this.year,
              company_id: this.company_id,
              page: this.page
            }
            this.$store.dispatch('guest/getGuestsByCompany', data);
          }
        }
      },
      spot_id: {
        immediate: false,
        handler() {
          let spotData = {
            month: this.month,
            year: this.year,
            spot_id: this.spot_id,
            page: this.page
          }
          if (this.spot_id !== 'all') {
            this.$store.dispatch('guest/getGuestsBySpot', spotData);
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
