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
          <input type="checkbox" class="switch" id="switch-normal"v-model="payload.enabled"
                 :checked="this.user.enabled">
          <label for="switch-normal"></label>
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
            message: "Пользователь обновлен",
            blockClass:'custom_alert_block',
            contentClass: 'custom_alert_content',
            wrapperClass: 'custom_alert_wrapper',
            x: (this.$vssWidth-300)*0.6,
            y: 5
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


  .row button {
    margin-bottom: 18px;
    margin-top: 25px;
    padding: 0 0 0 0.5rem;
  }

  $font-size-base: 1rem;
  $font-size-lg: ($font-size-base * 1.25);
  $font-size-sm: ($font-size-base * .875);
  $input-height: 2.375rem;
  $input-height-sm: 1.9375rem;
  $input-height-lg: 3rem;
  $input-btn-focus-width: .2rem;
  $custom-control-indicator-bg: #dee2e6;
  $custom-control-indicator-disabled-bg: #e9ecef;
  $custom-control-description-disabled-color: #868e96;
  $white: white;
  $theme-colors: (
    'primary': #37a967
  );

  $switch-height: calc(#{$input-height} * .8) !default;
  $switch-height-sm: calc(#{$input-height-sm} * .8) !default;
  $switch-height-lg: calc(#{$input-height-lg} * .8) !default;
  $switch-border-radius: $switch-height !default;
  $switch-bg: $custom-control-indicator-bg !default;
  $switch-checked-bg: map-get($theme-colors, 'primary') !default;
  $switch-disabled-bg: $custom-control-indicator-disabled-bg !default;
  $switch-disabled-color: $custom-control-description-disabled-color !default;
  $switch-thumb-bg: $white !default;
  $switch-thumb-border-radius: 50% !default;
  $switch-thumb-padding: 2px !default;
  $switch-focus-box-shadow: 0 0 0 $input-btn-focus-width rgba(map-get($theme-colors, 'primary'), .25);
  $switch-transition: .2s all !default;

  .switch {
    font-size: $font-size-base;
    position: relative;

    input {
      position: absolute;
      height: 1px;
      width: 1px;
      background: none;
      border: 0;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      overflow: hidden;
      padding: 0;

      + label {
        position: relative;
        min-width: calc(#{$switch-height} * 2);
        border-radius: $switch-border-radius;
        height: $switch-height;
        line-height: $switch-height;
        display: inline-block;
        cursor: pointer;
        outline: none;
        user-select: none;
        vertical-align: middle;
        text-indent: calc(calc(#{$switch-height} * 2) + .5rem);
      }

      + label::before,
      + label::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: calc(#{$switch-height} * 2);
        bottom: 0;
        display: block;
      }

      + label::before {
        right: 0;
        background-color: $switch-bg;
        border-radius: $switch-border-radius;
        transition: $switch-transition;
      }

      + label::after {
        top: $switch-thumb-padding;
        left: $switch-thumb-padding;
        width: calc(#{$switch-height} - calc(#{$switch-thumb-padding} * 2));
        height: calc(#{$switch-height} - calc(#{$switch-thumb-padding} * 2));
        border-radius: $switch-thumb-border-radius;
        background-color: $switch-thumb-bg;
        transition: $switch-transition;
      }

      &:checked + label::before {
        background-color: $switch-checked-bg;
      }

      &:checked + label::after {
        margin-left: $switch-height;
      }

      &:focus + label::before {
        outline: none;
        box-shadow: $switch-focus-box-shadow;
      }

      &:disabled + label {
        color: $switch-disabled-color;
        cursor: not-allowed;
      }

      &:disabled + label::before {
        background-color: $switch-disabled-bg;
      }
    }
  }

</style>
