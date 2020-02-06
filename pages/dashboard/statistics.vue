<template>
  <div class="statistics-page">
    <oy-page-header title="Общая статистика"></oy-page-header>
    <div class="metrics" ref="metrics">
      <metrica title="Компании" number="83" />
      <metrica title="Зон" number="115" />
      <metrica title="Персональных страниц" number="56" />
      <metrica title="Сохраненных устройств" number="156469" />
      <metrica title="Новых устройств" number="7131" />
      <metrica title="Авторизованных гостей" number="100000" />
      <metrica title="Актуальных сейссий" number="38045" />
    </div>

    <oy-page-header title="Статистика звонков"></oy-page-header>
    <div class="calls-charts-card">
      <calls />
    </div>

    <oy-page-header title="Статистика CMC"></oy-page-header>
    <div class="sms-charts-card">
      <sms />
    </div>
  </div>
</template>

<script>
import sms from "@/components/dashboard/statistics/sms.vue";
import calls from "@/components/dashboard/statistics/calls.vue";
import metrica from "@/components/dashboard/statistics/metrica.vue";
import oyPageHeader from "../../components/oyUI/page/oyPageHeader";
export default {
  layout: "dashboard",
  metaInfo() {
    return {
      titleTemplate: "%s | Статистика"
    };
  },
  created () {
    window.addEventListener('wheel', this.horizontalScrollListener, true);
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
  components: {
    sms,
    calls,
    metrica,
    oyPageHeader
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

  .metrics {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    margin-bottom: 1rem;
    padding-top: 1rem;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none;
    }
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
