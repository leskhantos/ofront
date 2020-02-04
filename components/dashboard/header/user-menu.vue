<template>
  <div class="user-menu">
      <slot name="trigger"></slot>
      <transition name="user-menu-fade">
          <div class="user-menu__container" v-if="visible">
              <div class="user-menu__header">
                <slot name="header"></slot>
              </div>
              <ul class="user-menu__dropdown">
                <slot></slot>
              </ul>
          </div>
      </transition>
  </div>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            required: false,
            default: Boolean(0)
        }
    }
}
</script>

<style lang="scss" scoped>
.user-menu {
  position: relative;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }

  &__container {
    position: absolute;
    right: -15px;
    margin-top: 10px;
    min-width: 15rem;
    background-color: #ffffff;
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, 0.02);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  &__dropdown {
    padding: 0;
    margin: 0;
    list-style: none;
  }
}
</style>