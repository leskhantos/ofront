<template>
  <div class="main-item">
      <h5>{{ title }}</h5>
      <oy-input :value="value"/>
  </div>
</template>

<script>
  export default {
    name: "main-item",
    props: {
      title: {
        type: String,
        required: false
      },
      value: {
        type: [String, Number],
        required: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main-item {
    display: flex;
    margin-top: 1rem;
  }
</style>
