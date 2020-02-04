<template>
  <div class="row no-gutters">
    <div class="col-lg-12">
      <div ref="calls_line_chart"></div>
    </div>
    <!-- <div class="col-lg-3">
      <div ref="calls_pie_chart"></div>
    </div> -->
  </div>
</template>

<script>
import ApexCharts from "apexcharts";
export default {
  mounted() {
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
        series: [290, 40, 20],
        labels: ["Доставлено", "Всего", "Повтор"],
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
            name: "Доставлено",
            data: this.calls_data_random
          },
          {
            name: "Всего",
            data: this.auth_data_random
          },
          {
            name: "Повтор",
            data: this.auth__data_random
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
    calls_data_random: function() {
      const min = 0;
      const max = 300;
      let data = [];
      for (let i = 1; i <= 20; i++) {
        data.push(Math.floor(Math.random() * (max - min)) + min);
      }
      return data;
    },
    auth_data_random: function() {
      const min = 0;
      const max = 300;
      let data = [];
      for (let i = 1; i <= 20; i++) {
        data.push(Math.floor(Math.random() * (max - min)) + min);
      }
      return data;
    },
    auth__data_random: function() {
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