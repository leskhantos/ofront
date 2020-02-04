<template>
  <div class="dashboard-layout">
    <sidebar/>
    <div class="dashboard-layout__content-wrapper">
      <dashHeader/>
      <transition name="page" mode="out-in">
        <nuxt></nuxt>
      </transition>
    </div>
  </div>
</template>

<script>
  import dashHeader from "@/components/dashboard/header.vue";
  import sidebar from "@/components/dashboard/sidebar/sidebar.vue";
    export default {
        name: "dashboard",
      components:{
        sidebar,
        dashHeader
      }
    }
</script>

<style lang="scss" scoped>
  .dashboard-layout {
    display: flex;
    flex-direction: row;
    height: 100vh;
    background-color: #f5f5f5;

    &__content-wrapper {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
</style>
