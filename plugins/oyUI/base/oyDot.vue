<template>
  <span class="dot" :style="{backgroundColor: activeColor }"></span>
</template>

<script>
    export default {
        name: "oyDot",
      props:{
          activeColor:{
            type:String,
            required:true
          }
      }
    }
</script>

<style scoped>
  .dot {
    height: 25px;
    width: 25px;
    border-radius: 50%;
    display: inline-block;
  }
</style>
