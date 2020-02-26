<template>
  <div class="row no-gutters">
    <div class="col-lg-12">
      <apexchart type="area" height="240" :options="chartOptions" :series="series"/>
    </div>
    <!-- <div class="col-lg-3">
      <div ref="calls_pie_chart"></div>
    </div> -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        series: [
          {
            name: "Загрузки",
            data: [11, 32, 45, 32, 34, 52, 41]
          },
          {
            name: "Авторизаций",
            data: [31, 40, 28, 51, 42, 109, 100]
          },
          {
            name: "Новые",
            data: [3, 50, 58, 11, 52, 10, 10]
          },
          {
            name: "Постоянные",
            data: [33, 30, 48, 16, 12, 20, 0]
          },
        ],
        chartOptions: {
          chart: {
            height: 240,
            width:600,
            type: 'area'
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            categories: [1,2,3,4,5,6,7]
          },
        },
      }
    },
  };
</script>
