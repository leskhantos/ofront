<template>
  <div class="statistics-page">
    <div class="metrics" ref="metrics">
      <metric title="Компании" :number="stats.count_company" />
      <metric title="Зон" :number="stats.count_spot" />
      <metric title="Персональных страниц" :number="stats.pages" />
      <metric title="Сохраненных устройств" :number="stats.count_all_device" />
      <metric title="Новых устройств" :number="stats.count_new_device" />
      <metric title="Авторизованных гостей" :number="stats.auth_guest" />
      <metric title="Актуальных сессий" :number="stats.session" />
    </div>

    <oy-page-header title="Звонки"></oy-page-header>
    <div class="calls-charts-card">
      <calls />
    </div>

    <oy-page-header title="CMC"></oy-page-header>
    <div class="sms-charts-card">
      <sms />
    </div>
  </div>
</template>

<script>
import sms from "@/components/dashboard/statistics/sms.vue";
import calls from "@/components/dashboard/statistics/calls.vue";
import metric from "@/components/dashboard/statistics/metrica.vue";

export default {
  layout: "dashboard",
  metaInfo() {
    return {
      titleTemplate: "%s | Статистика"
    };
  },
  created () {
    window.addEventListener('wheel', this.horizontalScrollListener, true);
    this.$store.dispatch('statistics/getStats');
  },
  beforeDestroy () {
    window.removeEventListener('wheel', this.horizontalScrollListener, true);
  },
  methods: {
    horizontalScrollListener(event) {
      if (event.target.closest('.metrics') !== null && this.$refs['metrics']) {
        if (event.deltaY > 0) this.$refs['metrics'].scrollLeft += 50;
        else this.$refs['metrics'].scrollLeft -= 50;
      }
    }
  },
  computed:{
    stats:function () {
        return this.$store.getters['statistics/stats']
    }
  },
  components: {
    sms,
    calls,
    metric
  }
};
</script>

<style lang="scss" scoped>
.statistics-page {
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


  .sms-charts-card,
  .calls-charts-card {
    padding: 1rem;
    background-color: #ffffff;
    box-shadow: 0px 1px 22px -12px #607d8b;
    margin: 1rem 0;
  }
}
</style>
