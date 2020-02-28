<template>
  <form @submit.prevent="storeStyle">
    <div class="row">
      <oy-input
        label="Название"
        v-model="form.name"
        input-class="col-lg-12"
        :error="errors['name']"
      />
    </div>
    <div class="row">
      <oy-input
        label="Тема"
        v-model="form.title"
        input-class="col-lg-12"
        :error="errors['title']"
      />
    </div>
    <div class="row">
      <oy-select class="col-lg-12"
                 @childToParent="onChange"
                 label="Тип"
                 firstOption="Выберите тип"
                 v-model="form.type"
                 :error="errors['type']"
                 :options="types"
      />
    </div>

    <div class="mt-3">
      <oy-button type="success" buttonType="submit" title="Сохранить" :block="true"/>
    </div>
  </form>
</template>

<script>
  export default {
    name: "storePage",
    props: {
      company_id: {
        type: Number,
        required: true
      },
    },
    data() {
      return {
        form: {
          name: '',
          type: '',
          title: '',
        }
      }
    },
    computed: {
      types: function () {
        return this.$store.getters['users/types']
      }
    },
    methods: {
      onChange(val) {
        this.form.type = val
      },
      async storeStyle() {
        try {
          const payload = {
            company_id: this.company_id,
            name: this.form.name,
            title: this.form.title,
            type: this.form.type,
          };
          await this.$axios.post('page', payload)
          this.$store.commit("app/SET_NEW_STYLE", false);
          await this.$store.dispatch('company/getStyles', this.company_id)
          this.flashMessage.success({
            title: "Страница добавлена",
          });
        } catch (e) {
          console.log(e)
        }
      }
    }

  }
</script>

<style scoped>

</style>
