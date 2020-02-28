<template>
  <div class="page-header">
    <div class="page-header__title">{{ title }}</div>
    <slot name="actions"></slot>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: false,
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    &__title {
      font-size: 1.5em;
      font-weight: 600;
    }
  }
</style>
