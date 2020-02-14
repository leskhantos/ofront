<template>
  <form @submit.prevent="storeCompany">
    <div class="row">
      <oy-input
        label="Наименование компании"
        v-model="form.company.name"
        input-class="col-lg-12"
        :error="errors['company.name']"
      />
    </div>
    <hr>
    <div class="row">
      <oy-input
        label="Имя зоны"
        v-model="form.spot.name"
        input-class="col-lg-6"
        :error="errors['spot.name']"
      />
      <oy-input
        label="Адрес подключения"
        v-model="form.spot.address"
        input-class="col-lg-6"
        :error="errors['spot.address']"
      />
    </div>
    <div class="row">
      <oy-input
        v-model="form.spot.interface"
        input-class="col-lg-6"
        label="Идентификатор"
        :error="errors['spot.interface']"

      />

      <div class="col-lg-6">
        <label :style="{ marginBottom: '0.3rem' }">Тип авторизации</label>
        <select
          class="form-control form-control-sm"
          v-model="form.spot.auth_type_id"
        >
          <option
            :key="type.id"
            :value="type.id"
            v-for="type in types"
              >{{type.name}}</option>
        </select>
      </div>
    </div>

    <div class="mt-3">
      <oy-button type="success" buttonType="submit" title="Сохранить" :block="true" />
    </div>
  </form>
</template>

<script>
import oyButton from "../../oyUI/base/oyButton";
import oyInput from "../../oyUI/base/oyInput";
export default {
  data(){
    return{
      form: {
        company: {
          name: ""
        },
        spot: {
          name: "",
          address: "",
          interface: "",
          auth_type_id: 1
        }
      }
    }
    },
  components:{
    oyButton,
    oyInput
  },
  computed:{
    types:function () {
      return this.$store.getters["company/auth_types"];
    }
  },
  methods:{
    async storeCompany() {
      try {
        await this.$axios.post('company', this.form.company).then((res)=>{
          this.$store.dispatch("company/getCompanies");
          this.$store.commit("app/SET_NEW_COMPANY",false);
          this.flashMessage.success({
            title: "Компания добавлена",
          });
          console.log(res.data.company.id )
          this.$router.push({ name: "dashboard-company-id",params:{ id:res.data.company.id }});
        })
      } catch (e) {
            console.log(e)
        }
    },
  },mounted() {
    this.$store.dispatch("company/getAuthTypes");
  }
};
</script>
