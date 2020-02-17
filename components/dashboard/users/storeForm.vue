<template>
  <form @submit.prevent="storeUser">
    <div class="row">
      <oy-input label="Логин" v-model="form.user.login" input-class="col-lg-12" :error="errors['login']"/>
    </div>

    <div class="row">
      <oy-input label="Имя пользователя" v-model="form.user.name" input-class="col-lg-6"  :error="errors['name']"/>
      <div class="col-lg-6">
        <label :style="{ marginBottom: '0.3rem' }">Тип пользователя</label>
        <select
          class="form-control form-control-sm"
          v-model="form.user.type"
        >
          <option

          >admin</option>
        </select>
      </div>

    </div>
    <div class="row">
      <oy-input label="Пароль" v-model="form.user.password" input-class="col-lg-6" type="password" :error="errors['password']"/>
      <oy-input label="Подтвердите пароль" v-model="form.repeated_password" input-class="col-lg-6" type="password" />
    </div>

    <div class="mb-0">
      <oy-button buttonType="submit" type="submit" title="Сохранить" class="btn btn-success" :block="true" />
    </div>
  </form>
</template>


<script>
  export default {
  data: () => ({
    form: {
      user:{
        login: '',
        name:'',
        user_type: 1,
        password:'',
      },
      repeated_password:''
    }
  }),
  methods: {
   async storeUser() {
     try {
       await this.$axios.post('users', this.form.user).then((res)=>{
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
  }
};
</script>
