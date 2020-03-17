<template>
  <form @submit.prevent="activate">
    <div class="row">
      <oy-input
        label="ID Ваучера"
        input-class="col-lg-12"
        v-model="form.id"
      />
    </div>
    <div class="row">
      <oy-input
        label="Комната"
        input-class="col-lg-12"
        v-model="form.room"

      />
    </div>
    <div class="row">
      <oy-input
        label="Дата и время начала"
        input-class="col-lg-12"
        type="datetime-local"
        v-model="form.startDate"
        :value="form.startDate"

      />
    </div>

    <div class="row">
      <oy-input
        label="Дата и время оканчания"
        input-class="col-lg-12"
        type="datetime-local"
        v-model="form.endDate"
      />
    </div>
    <div class="mt-3">
      <oy-button type="success" buttonType="submit" title="Сохранить" :block="true"/>
    </div>
  </form>
</template>

<script>
    export default {
      props: {
        spot_id:{
          type: Number,
          required: false
        }
      },
        name: "activateVoucher",
      data: () => ({
        form:{
          id: '',
          room:'',
          startDate: '',
          endDate:''
        }
      }),
      methods: {
       async activate(){
         try{
           let  payload = {
             id: this.form.id,
             form:{
               room: this.form.room,
               dt_start: this.form.startDate,
               dt_end:this.form.endDate
             }
           }
           await this.$axios.put(`vouchers/${payload.id}`, payload.form);
           await this.$store.dispatch('voucher/getVouchers', {spot_id: this.spot_id, activity:1})
           this.$store.commit('app/ACTIVATE_VOUCHER', false);
           this.flashMessage.success({
             title: "Ваучер активирован",
             position: 'left top',
             x: 550,
             y: 0
           });
         }catch(e)
         {
           this.flashMessage.error({
             title: e.response.data.message,
             position: 'left top',
             x: 550,
             y: 0
           });
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
        let start = date.getFullYear()+'-'+month+'-'+day+'T'+hour+':'+minute;
        let end = date.getFullYear()+'-'+month+'-'+dayEnd+'T'+hour+':'+minute;
        this.form.startDate = start.toString()
        this.form.endDate = end.toString();
        console.log(this.form)
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
             let end = date.getFullYear()+'-'+month+'-'+dayEnd+'T'+hour+':'+minute;

             this.form.endDate = end.toString()
           }
         }
      }
    }
</script>

<style scoped>

</style>
