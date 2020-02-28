<template>
  <div class="menu-header">
    <div class="menu-header__title">{{ title }}</div>
    <slot name="extra" class="menu-header__extra"></slot>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      }
    }
  }
</script>

<style lang="scss" scoped>
  .menu-header {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.3);
    padding: 10px 20px 10px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
</style>
