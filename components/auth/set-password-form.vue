<template>
  <form @submit.prevent="updatePassword">
    <oyInput label="Старый пароль" v-model="form.password" type="password" />
    <oyInput label="Новый пароль" v-model="form.new_password" type="password" />
    <oyInput label="Подтвердите новый пароль" v-model="form.new_password_confirmation" type="password" />
    <div class="mb-0 mt-3">
      <oyButton type="success" buttonType="submit" title="Сохранить" :block="true" />
    </div>
  </form>
</template>

<script>
  export default {
    data: () => ({
      form: {
        password: '',
        new_password: '',
        new_password_confirmation: '',
      }
    }),
    methods: {
      async updatePassword () {
        try {
          await this.$axios.post('',this.form)
          this.$emit('success');
        }catch (e) {
        console.log(e.response.data)
        }
      }
    }
  };
</script>
