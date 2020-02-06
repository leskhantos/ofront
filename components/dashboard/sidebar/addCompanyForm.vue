<template>
  <form @submit.prevent="storeCompany">
    <div class="row">
      <oy-input
        label="Наименование компании"
        v-model="form.company.name"
        input-class="col-lg-12"
      />
    </div>
    <div class="row">
      <oy-input
        label="Имя зоны"
        v-model="form.spot.name"
        input-class="col-lg-6"

      />
      <oy-input
        label="Адрес подключения"
        v-model="form.spot.address"
        input-class="col-lg-6"
      />
    </div>
    <div class="row">
      <oy-input
        v-model="form.spot.interface"
        input-class="col-lg-6"
        label="Идентификатор"

      />
      <!-- <oy-input
        label="Тип авторизации"
        v-model="form.spot.type"
        input-class="col-lg-6"
        :options="types"
        :error="$store.state.errors.list['company:spot.type']"
      />-->

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
          auth_type_id: 0
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
      await this.$store.dispatch("company/createCompany", this.form).then((res)=>{
        //this.$store.commit('app/SET_NEW_COMPANY', false);
        this.flashMessage.success({
          title: 'created',
        });
        this.$router.push({ name: "dashboard-statistics"});
      });

    },
  },mounted() {
    this.$store.dispatch("company/getAuthTypes");
  }
};
</script>
