<template>
  <form @submit.prevent="storeUser">
    <div class="row">
      <oy-input label="Логин" v-model="form.user.login" input-class="col-lg-12" :error="errors['login']"/>
    </div>

    <div class="row">
      <oy-input label="Имя пользователя" v-model="form.user.name" input-class="col-lg-6"  :error="errors['name']"/>
      <oy-select class="col-lg-6"
                 @childToParent="onChange"
                 label="Тип пользователя"
                 firstOption="Выберите тип"
                 v-model="form.user.type"
                 :error="errors['type']"
                 :options="options"
      />
    </div>
    <div class="row">
      <oy-input label="Пароль" v-model="form.user.password" input-class="col-lg-6" type="password" :error="errors['password']"/>
      <oy-input label="Подтвердите пароль" v-model="repeated_password" input-class="col-lg-6" type="password"/>
    </div>
    <transition class="row">
      <p v-if="notSamePasswords" class="col-xs-12 center-block text-center">Пароли не совпадают.</p>
    </transition>
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
    repeated_password:'',
    submitted:false,
    passwordVisible:false,
  }),
    computed:{
      notSamePasswords () {
        if (this.passwordsFilled) {
          return (this.form.user.password !== this.repeated_password)
        } else {
          return false
        }
      },
      passwordsFilled () {
        return (this.password !== '' && this.repeated_password !== '')
      },
    },
  methods: {
    onChange(val){
      this.form.user.type = val
    },
   async storeUser() {
     try {
       if(!this.notSamePasswords){
         await this.$axios.post('users', this.form.user)
         await this.$store.dispatch("users/getUsers");
         this.$store.commit("app/SET_NEW_USER",false);
         this.flashMessage.success({
           title: "Пользователь добавлен",
         });
         this.$router.push({ name: "dashboard-users"});
       }

     } catch (e) {
              console.log(e)
     }
   }
  }
};
</script>
<style lang="scss" scoped>
  p{
    color: #dc3545;
    bottom: -1.1rem;
  }
</style>
