<template>
  <div class="page" :style="{ padding: padding}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      padding: {
        type: String,
        required: false,
        default: "1rem"
      }
    }
  };
</script>

<style lang="scss" scoped>
  .page {
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: 1rem;
    background-color: #ffffff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02);
    border-radius: 3px;
    overflow-y: hidden;
  }

  @media screen and (max-width: 992px) {
    .page {
      margin: 4rem 1rem 1rem 1rem;
    }
  }
</style>
