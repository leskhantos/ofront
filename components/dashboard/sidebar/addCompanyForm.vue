<template>
  <div>
  <form @submit.prevent="storeCompany">
    <div class="row">
      <oy-input
        label="Наименование компании *"
        v-model="form.company.name"
        input-class="col-lg-12"
        :error="errors['name']"
        :value="name"
      />
    </div>

    <div class="row">
      <oy-input
        label="Адрес подключения"
        v-model="form.spot.address"
        input-class="col-lg-6"
        :error="errors['address']"
      />
      <oy-input
        label="Настройки"
        v-model="form.spot.settings"
        input-class="col-lg-6"
        :error="errors['settings']"
      />
    </div>
    <div class="row">
      <oy-input
        v-model="form.spot.ident"
        input-class="col-lg-6"
        label="Идентификатор"
        :error="errors['ident']"
      />
      <oy-select class="col-lg-6"
      @childToParent="onChange"
      label="Тип авторизации"
      firstOption="Выберите тип"
      v-model="form.spot.type"
      :error="errors['type']"
      :options="types"
      />
    </div>
    <div class="mt-3">
      <oy-button type="success" buttonType="submit" title="Сохранить" :block="true" />
    </div>
  </form>
  </div>
</template>

<script>
export default {
  props:{
    name:{
      type: String,
      required: false
    }
  },
  data(){
    return{
      form: {
        company: {
          name: ""
        },
        spot: {
          settings: null,
          address: null,
          ident: null,
          type: null
        }
      },
      company_id: null
    }
    },
  computed:{
    types:function () {
      return this.$store.getters["users/types"];
    },
  },
  methods:{
    onChange(val){
      this.form.spot.type = val
    },
    async storeCompany() {
      try {
         const company = await this.$axios.post('company', this.form.company)
          const payload = {
            company_id: company.data.id,
            address: this.form.spot.address,
            ident: this.form.spot.ident,
            type: this.form.spot.type,
            settings: this.form.spot.settings
          };
         if (this.form.spot.address || this.form.spot.ident || this.form.spot.type || this.form.spot.settings){
           await this.$axios.post('company/spot', payload)
         }
           await this.$store.dispatch("company/getCompanies");
            this.$store.commit("app/SET_NEW_COMPANY",false);
            this.flashMessage.success({
              title: "Компания добавлена",
          })
          this.$router.push({ name: "dashboard-company-id",params:{ id:company.data.id }});
      } catch (e) {
            console.log(e)
        }
    },
  },
};
</script>
