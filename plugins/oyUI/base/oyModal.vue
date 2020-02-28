<template>
  <transition name="oy-modal">
    <div class="oy-modal" v-if="visible">
      <div class="oy-modal__overlay" @mousedown.self="$emit('close')">
        <div
          class="oy-modal__container"
          :style="{
                    minWidth: minWidth,
                }"
        >
          <div class="oy-modal__header" v-if="title">
            <div class="oy-modal__header--title">{{ title }}</div>
            <div class="oy-modal__header--close-button" @click="$emit('close')">
              <i class="icon-close"></i>
            </div>
          </div>
          <div class="oy-modal__body" :style="{
            padding: padding
          }">
            <slot>New modal window</slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        required: false,
        default: Boolean(0)
      },
      minWidth: {
        type: String,
        required: false,
        default: "500px"
      },
      title: {
        type: String,
        required: false
      },
      padding: {
        type: String,
        required: false,
        default: "0"
      }
    }
  };
</script>

<style lang="scss" scoped>
  .oy-modal {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20000;

    &__overlay {
      background-color: rgba(0, 0, 0, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    &__header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      padding: 0.5rem 1rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);

      &--title {
        font-size: 140%;
        font-weight: bold;
      }

      &--close-button {
        cursor: pointer;
        font-size: 140%;
      }
    }

    &__container {
      background-color: white;
      border-radius: 3px;
    }
  }
</style>
