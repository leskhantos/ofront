<template>
  <div class="d-flex justify-content-between">
      <h6 class="mr-auto">{{ title }}</h6>
      <oy-input :value="value" :style="{paddingRight:'.2rem'}"/>
      <p>{{ unit }}</p>
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
        type: [String, Number],
        required: false
      },
      unit:{
        type: String,
        required: false
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
