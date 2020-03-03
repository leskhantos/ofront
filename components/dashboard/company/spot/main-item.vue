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
        name: "main-item",
      props: {
        title: {
          type: String,
          required: false
        },
        value: {
          type: [String,Number],
          required: false
        }
      }
    }
</script>

<style scoped>

</style>
