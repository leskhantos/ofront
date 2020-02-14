<template>
<div class="main-page">
  <div class="row">
    <div class="col">
      <p align="right">Наименование:</p>
    </div>
    <div class="col">
      <input type="text" :value="name">
    </div>
  </div>
  <div class="row">
    <div class="col">
      <p align="right">Включен</p>
    </div>
    <div class="col">
      <div class="custom-control custom-switch">
      <input type="checkbox" class="custom-control-input" id="customSwitch1" :checked="checked">
      <label class="custom-control-label" for="customSwitch1"></label>
    </div>
    </div>
  </div>

  <oy-page-header title="Гости"></oy-page-header>
  <div class="guest-charts-card">
    <guest/>
  </div>

  <oy-page-header title="Звонки"></oy-page-header>
  <div class="calls-charts-card">
    <guest/>
  </div>
</div>
</template>

<script>
  import guest from "../statistics/guest";
  import oyPageHeader from "../../oyUI/page/oyPageHeader";
    export default {
        name: "main",
      components:{
        guest,
        oyPageHeader
      },
      props:{
          name:{
            type: String,
            required:false
          },
        checked:{
            type: Boolean,
          required: false
        }

      }
    }
</script>

<style lang="scss" scoped>
  .main-page{
    padding: 1rem;
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 0.3rem;
    }

    &::-webkit-scrollbar-track {
      background-color: rgba(0, 0, 0, 0.15);
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.15);
    }

  .guest-charts-card,
  .calls-charts-card {
    padding: 1rem;
    background-color: #ffffff;
    box-shadow: 0px 1px 22px -12px #607d8b;
    margin: 1rem 0;
  }
  }
</style>
