<template>
  <div class="row no-gutters">
    <div class="col-lg-12">
      <apexchart ref="chart1" type="area" height="240" :options="chartOptions" :series="series"/>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      chartOptions: {
        type: Object,
        required: false
      },
      series: {
        type: Array,
        required: false
      }
    },
    watch: {
      '$route.path': function () {
        this.$refs.chart1.resetSeries()
      }
    }
  };
</script>
