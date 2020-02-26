<template>
  <div class="row ">
    <div class="col-lg-12">
      <apexchart type="area" height="240" :options="chartOptions" :series="series"/>
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
};
</script>
