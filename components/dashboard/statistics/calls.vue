<template>
  <div class="row">
    <div class="col">
      <apexchart type="area" height="240" :options="chartOptions" :series="series"/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      series: [
        {
          name: "Запросов",
          data: [11, 32, 45, 32, 34, 52, 41]
        },
        {
          name: "Авторизаций",
          data: [31, 40, 28, 51, 42, 109, 100]
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
