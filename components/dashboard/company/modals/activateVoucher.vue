<template>
  <form @submit.prevent="activate"
  >
    <div class="row">
      <oy-input
        label="ID Ваучера"
        input-class="col-lg-12"
        v-model="form.id"
        :error="errors['id']"
        @focus="focusInputs"
        :focus="true"
      />
    </div>
    <div class="row">
      <oy-input
        label="Комната"
        input-class="col-lg-12"
        v-model="form.room"
        :error="errors['room']"
        @focus="focusInputs"
      />
    </div>
    <div class="d-flex justify-content-between">
      <label>Дата и время начала</label>
      <input type="text" @focus="focusFirst" class="date-pick" :style="{border:'1px solid #ced4da', borderRadius:'0.2rem', padding:'0.25rem 0.5rem'}" v-model="form.startDate"/>
    </div>
    <date-pick
      v-if="showStart"
      :style="{width:'8rem', position:'fixed',right:'28%'}"
      :hasInputElement="false"
      v-model="form.startDate"
      :pickTime="true"
      :format="'YYYY-MM-DD HH:mm'"
      :months="months"
      :weekdays="weekdays"
      :nextMonthCaption="nextMonthCaption"
      :prevMonthCaption="prevMonthCaption"
      :setTimeCaption="setTimeCaption"
    ></date-pick>
    <div class="d-flex flex-column" :style="{paddingTop:'15px'}"       @click="showStart=false"
    >
      <div class="d-flex justify-content-between">
        <label>Дата и время оканчания</label>
        <input type="text" @focus="focusSecond"   :style="{border:'1px solid #ced4da', borderRadius:'0.2rem', padding:'0.25rem 0.5rem'}" v-model="form.endDate"/>
      </div>
      <date-pick
        @click="showEnd=false"
        v-if="showEnd && !showStart"
        :style="{width:'8rem', position:'fixed',right:'28%'}"
        :hasInputElement="false"
        v-model="form.endDate"
        :pickTime="true"
        :format="'YYYY-MM-DD HH:mm'"
        :months="months"
        :weekdays="weekdays"
        :nextMonthCaption="nextMonthCaption"
        :prevMonthCaption="prevMonthCaption"
        :setTimeCaption="setTimeCaption"
      ></date-pick>
    </div>

    <div class="mt-3">
      <oy-button type="success"  buttonType="submit" title="Сохранить" :block="true"/>
    </div>
  </form>
</template>

<script>
  import DatePick from "vue-date-pick";
  import "vue-date-pick/dist/vueDatePick.css";
  export default {
      components: {DatePick},
      props: {
        spot_id:{
          type: Number,
          required: false
        }
      },
        name: "activateVoucher",
      data: () => ({
        showStart: false,
        showEnd:false,
        form:{
          id: '',
          room:'',
          startDate: '',
          endDate:''
        },
        nextMonthCaption: "Следующий месяц",
        prevMonthCaption: "Предыдущий месяц",
        setTimeCaption: "Время:",
        weekdays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
        months: [
          "Январь",
          "Февраль",
          "Март",
          "Апрель",
          "Май",
          "Июнь",
          "Июль",
          "Август",
          "Сентябрь",
          "Октябрь",
          "Ноябрь",
          "Декабрь"
        ],
      }),
      methods: {
        focusFirst:function(){
          this.showStart = true;
          this.showEnd = false;
        },
        focusSecond: function() {
          this.showEnd = true;
          this.showStart = false
        },
        focusInputs: function () {
          this.showEnd = false;
          this.showStart = false
        },
       async activate(){
         try{
           let  payload = {
             spot_id: this.spot_id,
             form:{
               id: this.form.id,
               room: this.form.room,
               dt_start: this.form.startDate,
               dt_end:this.form.endDate
             }
           }
           this.showEnd = false;
           this.showStart = false;
           await this.$axios.put(`vouchers/${payload.spot_id}`, payload.form);
           await this.$store.dispatch('voucher/getVouchers', {spot_id: this.spot_id, activity:1})
           this.$store.commit('app/ACTIVATE_VOUCHER', false);
           this.flashMessage.success({
             message: "Ваучер активирован",
             blockClass:'custom_alert_block',
             contentClass: 'custom_alert_content',
             wrapperClass: 'custom_alert_wrapper',
             x: (this.$vssWidth-300)*0.6,
             y: 5
           });
         }catch(e)
         {
           if(typeof(e.response.data) == "object"){
             console.log(e)
           }else{
             let payload = {
               id: [e.response.data]
             }
             this.$store.dispatch('app/setErrors', payload)
           }
         }

        }
      },
      created(){
        let date = new Date()
        let month = date.getMonth()+1
        let minute = date.getMinutes()
        let day = date.getDate()
        let hour = date.getHours()
        if(month<10){
          month = '0'+month
        }
        if(minute<10){
          minute = '0'+minute
        }
        if (day<10){
          day = '0'+day
        }
        if (hour<10){
          day = '0'+day
        }
        let dayEnd = day+1
        let start = date.getFullYear()+'-'+month+'-'+day+' '+hour+':'+minute;
        let end = date.getFullYear()+'-'+month+'-'+dayEnd+' '+hour+':'+minute;
        this.form.startDate = start.toString()
        this.form.endDate = end.toString();
      },
      watch: {
         'form.startDate':{
           immediate: false,
           handler(val){
             let date = new Date(val)
             let month = date.getMonth()+1
             let minute = date.getMinutes()
             let day = date.getDate()
             let hour = date.getHours()

             if(month<10){
               month = '0'+month
             }
             if(minute<10){
               minute = '0'+minute
             }
             if (day<10){
               day = '0'+day
             }
             if (hour<10){
               day = '0'+day
             }
             let dayEnd = day+1
             let end = date.getFullYear()+'-'+month+'-'+dayEnd+' '+hour+':'+minute;

             this.form.endDate = end.toString()
           }
         }
      }
    }
</script>

<style lang="scss" scoped>

</style>
