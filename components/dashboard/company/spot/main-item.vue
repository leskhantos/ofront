<template>
  <div class="d-flex justify-content-between">
      <h5 :style="{marginLeft:'20rem'}">{{ title }}</h5>
      <oy-input :value="value" :style="{width:'30rem', marginRight:'20rem'}"/>
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
