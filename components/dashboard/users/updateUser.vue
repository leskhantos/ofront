<template>
  <form @submit.prevent="updateUser">
    <div class="row">
      <oy-input label="Логин" v-model="payload.login" input-class="col-lg-12" :error="errors['login']"/>
    </div>

    <div class="row">
      <oy-input label="Имя пользователя" v-model="payload.name" input-class="col-lg-12" :error="errors['name']"/>
    </div>

    <div class="row">
      <oy-select class="col-lg-12"
                 @childToParent="onChange"
                 label="Тип пользователя"
                 firstOption="Выберите тип"
                 v-model="payload.type"
                 :selected="payload.type"
                 :error="errors['type']"
                 :options="options"
      />
    </div>

    <div class="row">
      <div class="col-lg-6">
        <p>Включен:</p>
      </div>
      <div class="col-lg-6">
        <div class="custom-control custom-switch">
          <input type="checkbox" class="custom-control-input" id="customSwitch1" v-model="payload.enabled"
                 :checked="this.user.enabled">
          <label class="custom-control-label" for="customSwitch1"></label>
        </div>
      </div>
    </div>
    <br>
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
        login: '',
        type: '',
        enabled: ''
      },
      options: [
        {id: 'admin', name: 'Администратор'},
        {id: 'manager', name: 'Менеджер'},
        {id: 'support', name: 'Support'},
      ],
    }),
    methods: {
      onChange(val) {
        this.payload.type = val
      },
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
      this.payload.type = this.user.type
      this.payload.enabled = this.user.enabled
    }
  };
</script>
