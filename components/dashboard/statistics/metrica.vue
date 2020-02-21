<template>
  <div class="metric-item">
    <div class="metric-item__card">
      <div class="metric-item__card-icon">
        <spot-icon/>
      </div>
      <div class="metric-item__card--number">{{ number }}</div>
      <div class="metric-item__card--title">{{ title }}</div>
    </div>
  </div>
</template>

<script>
import SpotIcon from "../../icons/spotIcon";
export default {
  components: {SpotIcon},
  props: {
        title: {
            type: String,
            required: false,
            default: 'Неизвестная метрика'
        },
        number: {
            type: [String, Number],
            required: false,
            default: 0
        }
    }
}
</script>

<style lang="scss" scoped>
.metric-item {
  flex: 0 0 auto;
  display: inline-block;
  padding: 0 0.5rem 0.5rem 0;
  width: 20%;

  &__card {
    padding: 1rem;
    background-color: #ffffff;
    box-shadow: 0px 1px 22px -12px #607d8b;
    margin: 0 1rem 1rem 0;
    &--title {
      font-size: 14px;
      text-anchor: start;
      fill: rgb(55, 61, 63);
      text-align: right;
    }

    &--number {
      padding-left: 50%;
      font-size: 24px;
      text-anchor: start;
      fill: rgb(55, 61, 63);
      text-align: right;
    }
  }
}
</style>
