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
      <div class="col-lg-6">
        <label :style="{ marginBottom: '0.3rem' }">Тип авторизации</label>
        <select
          class="form-control form-control-sm"
          v-model="form.spot.type"
        >
          <option>1</option>
        </select>
      </div>
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
          settings: "",
          address: "",
          ident: "",
          type: null
        }
      },
      company_id: null
    }
    },
  computed:{
    types:function () {
      return this.$store.getters["company/auth_types"];
    },
  },
  methods:{
    async storeCompany() {
      try {
        if (!this.company_id){
          await this.$axios.post('company', this.form.company).then((res)=>{
            this.$store.dispatch("company/getCompanies");
            // this.$store.commit("app/SET_NEW_COMPANY",false);
            this.company_id = res.data.id
            this.$store.commit("app/SET_NEW_COMPANY",false);
            this.flashMessage.success({
              title: "Компания добавлена",
            });
            // this.$router.push({ name: "dashboard-company-id",params:{ id:res.data.id }});
          })
        }
        if (this.company_id){
          const payload = {
            company_id: this.company_id,
            address: this.form.spot.address,
            ident: this.form.spot.ident,
            type: this.form.spot.type,
            settings: this.form.spot.settings
          };
          await this.$axios.post('company/spot', payload).then((res)=>{
            this.$store.dispatch("company/getCompanies");
            this.$store.commit("app/SET_NEW_COMPANY",false);
            this.flashMessage.success({
              title: "Компания добавлена",
            });
            this.$router.push({ name: "dashboard-company-id",params:{ id:res.data.id }});
          })
        }
      } catch (e) {
            console.log(e)
        }
    },
    async storeSpot() {
      try {
      } catch (e) {
        console.log(e)
      }
    },
  },
  mounted() {
    this.$store.dispatch("company/getAuthTypes");
  }
};
</script>
