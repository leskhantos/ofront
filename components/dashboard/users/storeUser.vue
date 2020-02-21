<template>
  <form @submit.prevent="storeUser">
    <div class="row">
      <oy-input label="Имя пользователя" v-model="form.user.name" input-class="col-lg-12"  :error="errors['name']"/>
    </div>
    <div class="row">
      <oy-input label="Логин" v-model="form.user.login" input-class="col-lg-12" :error="errors['login']"/>
    </div>
    <div class="row" style="padding-right: 16px">
      <oy-input label="Пароль" v-model="form.user.password" input-class="col-lg-10" type="text" :error="errors['password']"/>
      <oy-button buttonType="button" alt="Сгенерировать пароль" :svgIcon="'passGenerateIcon'" class="col-lg-2" @click="generatePass"/>
    </div>
    <div class="row" :style="{ marginBottom: '1.5rem' }">
      <oy-select class="col-lg-12"
                 @childToParent="onChange"
                 label="Тип пользователя"
                 firstOption="Выберите тип"
                 v-model="form.user.type"
                 :error="errors['type']"
                 :options="options"
      />
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
        type: null,
        password:'',
      },
    },
    options:[
      { id:'admin', name: 'Администратор'},
      { id:'manager', name: 'Менеджер'},
      { id:'support', name: 'Support'},
    ],
  }),

  methods: {
    generatePass(){
      this.form.user.password = Math.random().toString(36).slice(-8);
    },
    onChange(val){
      this.form.user.type = val
    },
   async storeUser() {
     try {
         await this.$axios.post('users', this.form.user)
         await this.$store.dispatch("users/getUsers");
         this.$store.commit("app/SET_NEW_USER",false);
         this.flashMessage.success({
           title: "Пользователь добавлен",
         });
         this.$router.push({ name: "dashboard-users"});
     } catch (e) {
              console.log(e)
     }
   }
  }
};
</script>
<style lang="scss" scoped>
  .row button{
    margin-bottom: 18px;
    margin-top: 25px;
    padding: 0 0 0 30px;
  }
</style>
