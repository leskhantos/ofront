<template>
  <form @submit.prevent="updateUser">
    <div class="row">
      <oy-input label="Имя пользователя" v-model="payload.name" input-class="col-lg-12" :error="errors['name']"/>
    </div>

    <div class="row">
      <oy-input label="Логин" v-model="payload.login" input-class="col-lg-12" :error="errors['login']"/>
    </div>
    <div class="row" :style="{ marginBottom: '1.5rem' }">
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
      <div class="col-lg-9">
        <p>Включен:</p>
      </div>
      <div class="col-lg-3">
        <div class="switch float-right">
          <input class="switch" id="switch" name="switch" type="checkbox" v-model="payload.enabled"
                 :checked="this.user.enabled"/>
          <label data-off="" data-on="" for="switch"></label>
        </div>
      </div>
    </div>
    <div class="row" style="padding-right: 16px">
      <oy-input label="Пароль" v-model="payload.password" input-class="col-lg-10" type="text"
                :error="errors['password']"/>
      <oy-button buttonType="button" alt="Сгенерировать пароль" :svgIcon="'passGenerateIcon'" class="col-lg-2"
                 @click="generatePass"/>
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
        login: '',
        type: '',
        enabled: '',
        password: ''
      },
      options: [
        {id: 'admin', name: 'Администратор'},
        {id: 'manager', name: 'Менеджер'},
        {id: 'support', name: 'Support'},
      ],
    }),
    methods: {
      generatePass() {
        this.payload.password = Math.random().toString(36).slice(-8);
      },
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
            position: 'left top',
            x: 550,
            y: 0
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
<style lang="scss" scoped>
  $gray: lightgray;
  $blue: #007bff;
  $height: 28px;
  $width: $height * 2;

  .row button {
    margin-bottom: 18px;
    margin-top: 25px;
    padding: 0 0 0 30px;
  }

  .switch input[type=checkbox] {
    height: 0;
    width: 0;
    visibility: hidden;
  }

  div.switch.float-right {
    margin-top: -15px;
  }

  .switch label {
    cursor: pointer;
    width: $width;
    height: $height;
    background: $gray;
    display: block;
    border-radius: $height / 4;
    position: relative;
    margin: 0px;
  }

  .switch label:before {
    content: attr(data-off);
    position: absolute;
    top: $height * .05;
    right: 0;
    font-size: $height * .3;
    padding: ($height / 4) ($height / 4);
    color: white;
  }

  .switch input:checked + label:before {
    content: attr(data-on);
    position: absolute;
    left: 0;
    font-size: $height * .3;
    padding-left: $height / 4;
    color: white;
  }

  .switch label:after {
    content: '';
    position: absolute;
    top: $height * .05;
    left: $height * .05;
    width: $height * .9;
    height: $height * .9;
    background: #fff;
    border-radius: $height / 5;
  }

  .switch input:checked + label {
    background: $blue;
  }

  .switch input:checked + label:after {
    transform: translateX($width - $height);
  }

</style>
