<template>
  <oy-page>
    <div class="row">
      <div class="col-lg-8">
      </div>
      <div class="col-lg-4 float-right row">

        <oy-select class="col"
                   firstOption="Месяц"
                   @childToParent="onChangeMonth"
                   :options="months"
                   :selected="month"
                   v-model="month"
                   :disabled="true"
        />

        <oy-select class="col"
                   first-option="Год"
                   @childToParent="onChangeYear"
                   :options="years"
                   :selected="year"
                   v-model="year"
                   :disabled="true"
        />
      </div>
    </div>
    <oy-page-body :style="{ borderBottom: '1px solid rgba(0,0,0,.1)' }">
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
    </oy-page-body>
  </oy-page>
</template>

<script>
  import devicesIcon from "@/components/icons/devicesIcon";

  export default {
    components: {devicesIcon},
    data(){
      return{
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
      this.$store.dispatch('guest/getGuestsBySpot',  data);
    },
    methods:{
      onChangeMonth(val) {
        this.month = val
      },
      onChangeYear(val) {
        this.year = val
      },
    },
    computed:{
      years: function () {
        let currentYear = new Date().getFullYear(), years = [], startYear = 2018;
        while (startYear <= currentYear) {
          years.push({id: startYear++});
        }
        return years;
      },
      guestsBySpot(){
        return this.$store.getters['guest/guestsBySpot']
      },
      months: function () {
        let months = [
          {id: 1, name: 'Январь'},
          {id: 2, name: 'Февраль'},
          {id: 3, name: 'Март'},
          {id: 4, name: 'Апрель'},
          {id: 5, name: 'Май'},
          {id: 6, name: 'Июнь'},
          {id: 7, name: 'Июль'},
          {id: 8, name: 'Август'},
          {id: 9, name: 'Сентябрь'},
          {id: 10, name: 'Октябрь'},
          {id: 11, name: 'Ноябрь'},
          {id: 12, name: 'Декабрь'},
        ]
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
            let spotData = {
              month: this.month,
              year: this.year,
              spot_id: this.spot_id
            }
            this.$store.dispatch('guest/getGuestsBySpot', spotData);
        }
      },
      year: {
        immediate: false,
        handler() {
            let spotData = {
              month: this.month,
              year: this.year,
              spot_id: this.spot_id
            }
            this.$store.dispatch('guest/getGuestsBySpot', spotData);
        }
      },
    }
  }
</script>

<style scoped>

</style>
