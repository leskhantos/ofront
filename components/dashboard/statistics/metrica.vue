<template>
  <div class="metric-item">
    <div class="metric-item__card">
      <div class="metric-item__card--number">
        <component :is="currentIcon" :color="'currentColor'"/>
        {{ number }}
      </div>
      <div class="metric-item__card--title">{{ title }}</div>
    </div>
  </div>
</template>

<script>
  import SpotIcon from "../../icons/spotIcon";
  import companyIcon from "../../icons/companyIcon";
  import pageIcon from "../../icons/pageIcon";
  import devicesIcon from "../../icons/devicesIcon";
  import newDeviceIcon from "../../icons/newDeviceIcon";
  import authGuestIcon from "../../icons/authGuestIcon";
  import actualSessionIcon from "../../icons/actualSessionIcon";
  import voucherIcon from "../../icons/voucherIcon"

  export default {
    components: {SpotIcon, companyIcon, pageIcon, devicesIcon, newDeviceIcon, authGuestIcon, actualSessionIcon, voucherIcon},
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
      },
      currentIcon: {
        type: String,
        required: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .metric-item {
    display: inline-block;
    padding: 0 1rem;
    width: 20%;

    &__card {
      padding: 1rem;
      background-color: #ffffff;
      box-shadow: 0px 1px 22px -12px #607d8b;
      margin: 0 1rem 1rem 0;

      &--title {
        font-size: 12px;
        font-weight: 500;
        text-anchor: start;
        fill: rgb(55, 61, 63);
        text-align: right;
        text-transform: uppercase;
      }

      &--number {
        svg {
          float: left;
          width: 36px;
          height: 36px;
        }

        font-size: 24px;
        text-anchor: start;
        fill: rgb(55, 61, 63);
        text-align: right;
      }
    }
  }
</style>
