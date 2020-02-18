<template>
  <form @submit.prevent="updateUser">
    <div class="row">
      <oy-input label="Логин" v-model="payload.login" input-class="col-lg-12" :error="errors['login']"/>
    </div>

    <div class="row">
      <oy-input label="Имя пользователя" v-model="payload.name" input-class="col-lg-12" :error="errors['name']"/>
    </div>

    <div class="mb-0">
      <oy-button buttonType="submit" type="submit" title="Сохранить" class="btn btn-success" :block="true"/>
    </div>
  </form>
</template>


<script>
  export default {
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    data: () => ({
      payload: {
        name: '',
        login: ''
      }
    }),
    computed: {
      types: function () {
        return this.$store.getters['users/types']
      }
    },
    methods: {
      async updateUser() {
        try {
          await this.$axios.put(`users/${this.user.id}`, this.payload)
          await this.$store.dispatch("users/getUsers");
          this.$store.commit("app/SET_UPDATE_USER", false);
          this.flashMessage.success({
            title: "Пользователь обновлен",
          });
          this.$router.push({name: "dashboard-users"});
        } catch (e) {
          console.log(e)
        }
      }
    },
    mounted() {
      this.payload.name = this.user.name
      this.payload.login = this.user.login
    }
  };
</script>
