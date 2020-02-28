<template>
  <div class="row setting-item">
    <div class="col">
      <h3>{{ title }}</h3>
    </div>
    <div class="col">
      <oy-input :value="value"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "setting-item",
    props: {
      title: {
        type: String,
        required: false
      },
      value: {
        type: String,
        required: false
      }
    }
  }
</script>

<style scoped lang="scss">
  .setting-item {
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    margin-top: 1rem;
  }
</style>
