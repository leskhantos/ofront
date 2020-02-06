<template>
  <form @submit.prevent="storeUser">
    <div class="row">
      <oy-input label="Логин" v-model="form.username" input-class="col-lg-12" error="" />
    </div>

    <div class="row">
      <oy-input label="Имя пользователя" v-model="form.username" input-class="col-lg-6" />
      <oy-input label="Тип пользователя" v-model="form.user_type" input-class="col-lg-6"
        :options="[
          { key: 'admin', title: 'Администратор' },
          { key: 'company', title: 'Компания' },
        ]"
      />
    </div>

    <transition name="fade">
      <div v-if="form.user_type === 'company'">
        <div class="row">
          <oy-input label="Наименование компании" v-model="form.username" input-class="col-lg-12" />
        </div>
        <div class="row">
          <oy-input label="Имя зоны" v-model="form.username" input-class="col-lg-6" />
          <oy-input label="Адрес подключения" v-model="form.username" input-class="col-lg-6" />
        </div>
        <div class="row">
          <oy-input label="Идентификатор" v-model="form.username" input-class="col-lg-6" />
          <oy-input label="Тип авторизации" v-model="form.username" input-class="col-lg-6" :options="[
            { key: 'admin', title: 'Администратор' },
            { key: 'company', title: 'Компания' },
          ]" />
        </div>
      </div>
    </transition>

    <div class="row">
      <oy-input label="Пароль" v-model="form.username" input-class="col-lg-6" type="password" />
      <oy-input label="Подтвердите пароль" v-model="form.username" input-class="col-lg-6" type="password" />
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
      user_type: "",
      username: ""
    }
  }),
    components:{
      oyInput,
      oyButton
    },
  methods: {
   async storeUser() {
        await this.$store.dispatch('users/createUser', this.form);
    }
  }
};
</script>
