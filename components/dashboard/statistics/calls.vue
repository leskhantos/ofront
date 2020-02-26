<template>
  <div class="row">
    <div class="col">
      <apexchart ref="chart" type="area" height="240" :options="chartOptions" :series="series"/>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    chartOptions:{
      type: Object,
      required:false
    },
    series: {
      type:Array,
      required: false
    }
  },
  watch:{
    '$route.path':function () {
      this.$refs.chart.resetSeries()
    }
  }
};
</script>
