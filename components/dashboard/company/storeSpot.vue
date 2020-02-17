<template>
  <form @submit.prevent="storeSpot">
    <div class="row">
      <oy-input
        label="Адрес подключения"
        v-model="form.address"
        input-class="col-lg-6"
        :error="errors['address']"
      />
      <oy-input
        label="Настройки"
        v-model="form.settings"
        input-class="col-lg-6"
        :error="errors['settings']"
      />
    </div>
    <div class="row">
      <oy-input
        v-model="form.ident"
        input-class="col-lg-6"
        label="Идентификатор"
        :error="errors['ident']"

      />
      <div class="col-lg-6">
        <label :style="{ marginBottom: '0.3rem' }">Тип авторизации</label>
        <select
          class="form-control form-control-sm"
          v-model="form.type"
        >
          <option>тип</option>
        </select>
      </div>
    </div>

    <div class="mt-3">
      <oy-button type="success" buttonType="submit" title="Сохранить" :block="true" />
    </div>
  </form>
</template>


<script>
  import oyInput from "../../oyUI/base/oyInput";
  import oyButton from "../../oyUI/base/oyButton";
  export default {
    props:{
      company_id:{
        type: Number,
        required: true
      }
    },
    data: () => ({
      form: {
        address: '',
        ident: '',
        type: 1,
        settings: ''
      }
    }),
    components:{
      oyInput,
      oyButton
    },
    methods: {
      async storeSpot() {
        try {
          const payload = {
            company_id:this.company_id,
            address: this.form.address,
            ident: this.form.ident,
            type: this.form.type,
            settings: this.form.settings
          };
          await this.$axios.post('company/spot', payload).then((res)=>{
            this.$store.commit("app/SET_NEW_SPOT",false);
            this.flashMessage.success({
              title: "Spot added",
            });
            this.$store.dispatch('company/getSpots', this.company_id)
          })
        } catch (e) {
          console.log(e)
        }
      }
    }
  };
</script>
123
