<template>
  <div class="not-found-page">
    <div class="title">Запрашиваемый вами ресурс не найден</div>
    <nuxt-link v-if="user.type!=='client'" :to="{ name: 'dashboard-statistics' }">Вернуться в статистику</nuxt-link>
    <nuxt-link v-else :to="{ name: 'dashboard-cabinet-spot', params: {cabinet: user.id_company }}">Вернуться в зоны</nuxt-link>
  </div>
</template>
<script>
  export default {
    layout: "dashboard",
    computed: {
      user: function () {
        return this.$store.getters['users/user']
      }
    }
  }
</script>
<style lang="scss" scoped>
  .not-found-page {
    text-align: center;

    .title {
      font-size: 1.5rem;
      font-weight: 600;
    }
  }
</style>
