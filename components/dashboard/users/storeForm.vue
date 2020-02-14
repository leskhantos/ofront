<template>
  <form @submit.prevent="storeUser">
    <div class="row">
      <oy-input label="Логин" v-model="form.user.username" input-class="col-lg-12"/>
    </div>

    <div class="row">
      <oy-input label="Имя пользователя" v-model="form.user.name" input-class="col-lg-6" />
      <div class="col-lg-6">
        <label :style="{ marginBottom: '0.3rem' }">Тип пользователя</label>
        <select
          class="form-control form-control-sm"
          v-model="form.user.user_type"
        >
          <option
            :key="role.id"
            :value="role.name"
            v-for="role in roles"
          >{{role.name}}</option>
        </select>
      </div>

    </div>
    <div class="row">
      <oy-input label="Пароль" v-model="form.user.password" input-class="col-lg-6" type="password" />
      <oy-input label="Подтвердите пароль" v-model="form.user.password" input-class="col-lg-6" type="password" />
    </div>

    <div class="mb-0">
      <oy-button type="success" title="Сохранить" :block="true" />
    </div>
  </form>
</template>


<script>
import oyInput from "../../oyUI/base/oyInput";
import oyButton from "../../oyUI/base/oyButton";
  export default {
  data: () => ({
    form: {
      user:{
        username: '',
        name:'',
        user_type:'',
        password:'',
        repeated_password:''
      },
    }
  }),
    components:{
      oyInput,
      oyButton
    },
  methods: {
   async storeUser() {
     try {
       await this.$axios.post('user', this.form).then((res)=>{
         this.$store.dispatch("users/getUsers");
         this.$store.commit("app/SET_NEW_USER",false);
         this.flashMessage.success({
           title: "User added",
         });
         this.$router.push({ name: "dashboard-users"});
       })
     } catch (e) {
              console.log(e)
     }
   }
  },
    computed:{
      roles:function () {
        return this.$store.getters["users/roles"];
      }
    }
};
</script>
