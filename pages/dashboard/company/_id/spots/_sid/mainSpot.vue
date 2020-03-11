<template>
  <oy-page>
    <oy-page-header/>
    <oy-page-body :style="{borderBottom: '1px solid rgba(0,0,0,.1)' }">
      <main-item title="Название:" :value="spot.address"/>
      <main-item title="Адрес:" :value="spot.address"/>
      <main-item title="Идентификатор:" :value="spot.ident"/>
      <main-item title="Страница:" :value="spot.page_id"/>
      <main-item title="Тип:" :value="spot.type"/>
      <main-item title="Время жизни сессии:" :value="spot.type"/>
      <main-item title="Переадресация:" :value="spot.type"/>
      <main-item title="Таймер активности" :value="spot.type"/>
      <oy-switch :style="{marginLeft:'20rem'}" :marginLeft="'10.1rem'" title="Международные номера" :checked="false"/>
      <oy-switch :style="{marginLeft:'20rem'}" :marginLeft="'20rem'" title="Включен" :checked="spot.enabled"/>
    </oy-page-body>
  </oy-page>
</template>

<script>
  import MainItem from "@/components/dashboard/company/spot/main-item";

  export default {
    components: {MainItem},
    computed: {
      spot: function () {
        return this.$store.getters['spot/spot']
      }
    }
  }
</script>

<style scoped>

</style>
