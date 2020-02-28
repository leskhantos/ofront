<template>
  <div class="company-page">
    <nav class="nav nav-pills nav-fill">
      <div class="nav-item nav-link border">Основное</div>
      <div class="nav-item nav-link border">Статистика</div>
      <div class="nav-item nav-link border">Гости</div>
      <div class="nav-item nav-link border">Сессии</div>
      <div class="nav-item nav-link border">События</div>
      <div class="nav-item nav-link border">Звонки</div>
    </nav>

    <component/>
  </div>
</template>

<script>

  export default {
    layout: "dashboard",
  }
</script>

<style lang="scss" scoped>
  .company-page {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;

    &__title {
      margin-top: .5rem;
      margin-right: .1rem;
      margin-left: .1rem;
    }

    &::-webkit-scrollbar {
      width: 0.3rem;
    }

    &::-webkit-scrollbar-track {
      background-color: rgba(0, 0, 0, 0.15);
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.15);
    }

    .active {
      background-color: #575962;
    }
  }
</style>
