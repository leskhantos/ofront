<template>
  <div class="d-flex">
    <h6 class="card-title">{{ title }}</h6>
    <p class="card-text" :style="{marginLeft:'.3rem'}">{{ text }}</p>
  </div>
</template>

<script>
    export default {
      props: {
        title:{
          type: String,
          required:false
        },
        text:{
          type: [String,Number],
          required: false
        }
      },
        name: "deviceData"
    }
</script>

<style lang="scss"scoped>
  h6{
    font-weight:600;
  }
</style>
