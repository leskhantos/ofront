<template>
  <form @submit.prevent="storeSpot">
    <div class="row">
      <oy-input
        label="Адрес подключения"
        v-model="form.address"
        input-class="col-lg-12"
        :error="errors['address']"
      />
    </div>
    <div class="row">
      <oy-input
        v-model="form.ident"
        input-class="col-lg-12"
        label="Идентификатор"
        :error="errors['ident']"

      />
    </div>
    <div class="row" :style="{ marginBottom: '1.5rem' }">
      <oy-select class="col-lg-12"
                 @childToParent="onChange"
                 label="Тип зоны"
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
    props: {
      company_id: {
        type: Number,
        required: true
      }
    },
    data: () => ({
      form: {
        address: '',
        ident: '',
        type: null
      }
    }),
    computed: {
      types: function () {
        return this.$store.getters['spot/spotTypesByCompany']
      }
    },
    methods: {
      onChange(val) {
        this.form.type = val
      },
      async storeSpot() {
        try {
          const payload = {
            company_id: this.company_id,
            address: this.form.address,
            ident: this.form.ident,
            type: this.form.type
          };
          await this.$axios.post('company/spot', payload)
          this.$store.commit("app/SET_NEW_SPOT", false);
          this.flashMessage.success({
            title: "Зона добавлена",
            position: 'left top',
            x: 550,
            y: 0
          });
          await this.$store.dispatch('company/getSpots', this.company_id)
        } catch (e) {
          console.log(e)
        }
      }
    }
  };
</script>
