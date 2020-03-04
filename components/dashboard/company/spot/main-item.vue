<template>
  <div class="row main-item">
    <div class="col">
      <h5>{{ title }}</h5>
    </div>
    <div class="col">
      <oy-input :value="value"/>
    </div>
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
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    margin-top: 1rem;
  }
</style>
