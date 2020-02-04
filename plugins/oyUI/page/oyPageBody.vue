<template>
  <div class="page__body">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.page {
  &__body {
    flex: 1;
    margin-top: 1rem;
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: .3rem;
    }

    &::-webkit-scrollbar-track {
      background-color: rgba(0,0,0,.15);
    }

    &::-webkit-scrollbar-thumb {
          background-color: rgba(0,0,0,.15);
    }
  }
}
</style>