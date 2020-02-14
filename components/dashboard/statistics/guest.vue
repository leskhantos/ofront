<template>
  <div class="row no-gutters">
    <div class="col-lg-12">
      <div ref="calls_line_chart"></div>
    </div>
  </div>
</template>

<script>
  import ApexCharts from "apexcharts";
  export default {
    mounted() {
      this.getRandomData();

      const calls_line_chart = new ApexCharts(
        this.$refs["calls_line_chart"],
        this.calls_line_chart_data
      );
      const calls_pie_chart = new ApexCharts(
        this.$refs["calls_pie_chart"],
        this.calls_pie_chart_data
      );

      calls_line_chart.render();
      calls_pie_chart.render();
    },
    data: () => ({
      calls_data: [],
      auth_data: []
    }),
    computed: {
      calls_pie_chart_data: function() {
        return {
          chart: {
            type: "pie",
            height: "300px"
          },
          legend: {
            position: "bottom"
          },
          series: [300, 50],
          labels: ["Запросов", "Авторизаций"],
          dataLabels: {
            enabled: false
          }
        };
      },
      calls_line_chart_data: function() {
        return {
          chart: {
            type: "area",
            height: "240",
            width: "100%"
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: "smooth"
          },
          series: [
            {
              name: "Запросов",
              data: this.calls_data
            },
            {
              name: "Авторизаций",
              data: this.auth_data
            }
          ],
          xaxis: this.calls_xaxis_categories
        };
      },
      calls_xaxis_categories: function() {
        let array = [];
        for (let i = 1; i <= 20; i++) {
          array.push(String(i));
        }
        return { categories: array };
      },
    },
    methods: {
      getRandomData () {
        this.auth_data = this.randomData();
        this.calls_data = this.randomData();
      },
      randomData () {
        const min = 0;
        const max = 300;
        let data = [];
        for (let i = 1; i <= 20; i++) {
          data.push(Math.floor(Math.random() * (max - min)) + min);
        }
        return data;
      }
    }
  };
</script>
