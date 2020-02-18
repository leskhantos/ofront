<template>
    <oy-page>
      <oy-page-body :style="{ borderTop: '1px solid rgba(0,0,0,.1)', borderBottom: '1px solid rgba(0,0,0,.1)' }">
        <oy-page-header title="Гости"></oy-page-header>
        <div class="guest-charts-card">
          <guest/>
        </div>

        <oy-page-header title="Звонки"></oy-page-header>
        <div class="calls-charts-card">
          <calls/>
        </div>
      </oy-page-body>
    </oy-page>
</template>

<script>
  import guest from "../statistics/guest";
  import calls from "../statistics/calls";
    export default {
        name: "mainPage",
      components:{
        guest,calls
      },
      props:{

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
