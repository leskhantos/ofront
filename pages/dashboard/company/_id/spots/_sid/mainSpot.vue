<template>
  <oy-page>
    <form @submit.prevent="saveForm">
    <oy-page-body class="d-flex flex-column">
      <main-item title="Адрес:" v-model="form.address"/>
      <main-item title="Идентификатор:"  v-model="form.ident"/>
      <main-item title="Страница:" v-model="form.page_id"/>
      <main-item title="Тип:" v-model="form.type"/>
      <main-item title="Время жизни сессии:" v-model="form.type"/>
      <main-item title="Переадресация:" v-model="form.type"/>
      <main-item title="Таймер активности" v-model="form.type"/>
      <oy-switch title="Международные номера" :checked="false" :classes="['row','mr-auto','col-lg-6']"/>
      <oy-switch title="Включен" :checked="spot.enabled" :classes="['row','mr-auto','col-lg-6']"/>
    </oy-page-body>
    <div class="d-flex justify-content-end">
      <oy-button
        title="Сохранить"
        type="success"
        button-type="submit"
        :svgIcon="'saveIcon'"
      >
      </oy-button>
    </div>
    </form>
  </oy-page>
</template>

<script>
  import MainItem from "@/components/dashboard/company/spot/main-item";

  export default {
    components: {MainItem},
    data() {
      return{
        form:{
          address:'',
          ident:'',
          page_id:'',
          type: ''
        }
      }
    },
    computed: {
      spot: function () {
        return this.$store.getters['spot/spot']
      }
    },
    methods: {
      saveForm:function () {
        console.log('form send')
      }
    },
    mounted(){
        this.form.address = this.spot.address,
        this.form.ident = this.spot.ident,
        this.form.page_id = this.spot.page_id,
        this.form.type = this.spot.type
    }
  }
</script>

<style scoped>

</style>
