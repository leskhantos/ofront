<template>
  <button
    :type="buttonType"
    @click="$emit('click')"
    :class="[buttonClass, blockClass]"
  >
    <div :class="{ 'mr-lg-2 mr-0': hasAntIconSlot }" class="icon-plus-wrapper">
      <slot name="icon">
        <i v-if="icon" :class="icon"></i>
      </slot>
    </div>
    <span
      v-if="title"
      :class="{
        'd-lg-inline d-none': titleHidden,
        'ml-2': !hasAntIconSlot && icon
    }"
    >{{ title }}</span>
  </button>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: "Новая кнопка"
    },
    titleHidden: {
      type: Boolean,
      required: false,
      default: () => Boolean(0)
    },
    block: {
      type: Boolean,
      required: false,
      default: () => Boolean(0)
    },
    icon: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: false,
      default: "default"
    },
    buttonType: {
      type: String,
      required: false,
      default: "button"
    }
  },
  computed: {
    buttonClass: function() {
      return `btn btn-${this.type}`;
    },
    blockClass: function() {
      if (this.block) return "btn-block";
    },
    hasAntIconSlot() {
      return !!this.$slots["ant-icon"];
    }
  }
};
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  align-items: center;

  .icon-plus {
    font-size: 16px;

    &-wrapper {
      margin-top: .3rem;
    }
  }

  &-block {
    width: 100%;
    justify-content: center;
  }
}
</style>
