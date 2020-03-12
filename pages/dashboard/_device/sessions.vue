<template>
  <oy-page>
    <div class="d-flex">
      <div class="d-flex ml-auto">
        <oy-select v-show="session_type==='3'"
                   firstOption="Месяц"
                   @childToParent="onChangeMonth"
                   :options="months"
                   :selected="month"
                   v-model="month"
        />

        <oy-select v-show="session_type==='3'"
                   first-option="Год"
                   @childToParent="onChangeYear"
                   :options="years"
                   :selected="year"
                   v-model="year"
        />
        <oy-select
          firstOption="Тип"
          @childToParent="onChangeSessionType"
          :options="sessionTypes"
          v-model="session_type"
          :selected="1"
        />
      </div>
    </div>
    <oy-page-body>
      <table class="table table-striped" >
        <thead>
        <tr>
          <th>Создано</th>
          <th>Устройство</th>
          <th v-show="session_type==='2'|| session_type==='3'">Истекает</th>
          <th v-show="session_type==='3'">Трафик</th>
        </tr>
        </thead>
        <tbody v-if="sessionsData">
        <tr v-for="session in sessionsData">
          <td>{{session.created}}</td>
          <td>{{session.device_mac}}</td>
          <td v-show="session_type==='2'|| session_type==='3'">{{session.expiration}}</td>
          <td v-show="session_type==='3'">
            <div style="color:green">{{ session.bytes_in}} </div>
            <div style="color:red"> {{session.bytes_out}} </div>
          </td>
        </tr>
        <tr v-if="!sessionsData.length" class="no-data text-center">
          <td colspan="14">Нет данных</td>
        </tr>
        </tbody>
      </table>
      <table-pagination v-show="sessionsDataPerPage < sessionsDataTotal" :listData="sessionsData"
                        :pageNumber="sessionsDataCurrentPage"
                        :size="sessionsDataPerPage"
                        :total="sessionsDataTotal"
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
        device_id:this.$route.params.device,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        session_type: 1,
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
        device_id:this.$route.params.device,
        session_type: this.session_type,
        page: this.page
      }
      this.$store.dispatch('device/getSessionsByDevice',data );
    },
    methods: {
      onChangeMonth(val) {
        this.month = val
      },
      onChangeYear(val) {
        this.year = val
      },
      onChangeSessionType(val) {
        this.session_type = val
      },
      prevPage(val){
        this.page = val
        let data = {
          month: this.month,
          year: this.year,
          device_id: this.device_id,
          session_type: this.session_type,
          page: this.page-1
        }
        this.$store.dispatch('device/getSessionsByDevice',data);
      },
      nextPage(val){
        this.page = val
        let data = {
          month: this.month,
          year: this.year,
          device_id: this.device_id,
          session_type: this.session_type,
          page: this.page+1
        }
        this.$store.dispatch('device/getSessionsByDevice',data);
      },
      selPage(val){
        this.page = val
        let data = {
          month: this.month,
          year: this.year,
          device_id: this.device_id,
          session_type: this.session_type,
          page: this.page
        }
        this.$store.dispatch('device/getSessionsByDevice',data);
      },
    },
    computed: {
      years: function () {
        return this.$store.getters['app/get_years']
      },
      sessionTypes() {
        return this.$store.getters['spot/sessionTypes']
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
      sessionsData(){
        return this.$store.getters['device/sessionsByDevice']
      },
      sessionsDataCurrentPage(){
        return this.$store.getters['device/sessionsDataCurrentPage']
      },
      sessionsDataPerPage(){
        return this.$store.getters['device/sessionsDataPerPage']
      },
      sessionsDataTotal(){
        return this.$store.getters['device/sessionsDataTotal']
      },
    },
    watch: {
      month: {
        immediate: false,
        handler() {
          let data = {
            month: this.month,
            year: this.year,
            device_id: this.device_id,
            session_type: 3,
            page: this.page
          }
          this.$store.dispatch('device/getSessionsByDevice',data );
        }
      },
      year: {
        immediate: false,
        handler() {
          let data = {
            month: this.month,
            year: this.year,
            device_id: this.device_id,
            session_type: 3,
            page: this.page
          }
          this.$store.dispatch('device/getSessionsByDevice',data );
        }
      },
      session_type: {
        immediate: false,
        handler() {
          let data = {
            month: this.month,
            year: this.year,
            device_id: this.device_id,
            session_type: this.session_type,
            page: this.page
          }
          this.$store.dispatch('device/getSessionsByDevice',data );
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
  .offset{
    width: 500px !important;
    margin: 20px auto;
  }
</style>
