<template>
  <svg :style="{width:width, height:height}" viewBox="0 0 24 24">
    <path :fill="color" d="M20,4A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4H20M11,13H9V15H11V13M19,13H13V15H19V13M7,9H5V11H7V9M19,9H9V11H19V9Z" />
  </svg>
</template>

<script>
    export default {
      props: {
        color:{
          type: String,
          required:false
        },
        width:{
          type:String,
          required: false,
          default:'36px'
        },
        height:{
          type:String,
          required: false,
          default:'36px'
        }
      },
        name: "voucherIcon"
    }
</script>

<style scoped>

</style>
