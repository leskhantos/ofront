<template>
  <div class="not-found-page">
    <div class="title">Запрашиваемый вами ресурс не найден</div>
    <nuxt-link :to="{ name: 'dashboard-statistics' }">Вернуться назад</nuxt-link>
  </div>
</template>

<style lang="scss" scoped>
  .not-found-page {
    text-align: center;

    .title {
      font-size: 120%;
      font-weight: 600;
    }
  }
</style>
