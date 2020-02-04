<template>
  <div
    class="oy-avatar"
    :style="{
      backgroundColor: bgColor,
      cursor: cursor
    }"
    :class="{ 'oy-avatar__is-focused' : focused }"
    @click="$emit('click')"
  >
    <span class="oy-avatar__title">{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: {
    focused: {
      type: Boolean,
      required: false,
      default: Boolean(0)
    },
    title: {
      type: String,
      required: false
    },
    bgColor: {
      type: String,
      required: false,
      default: '#f04641'
    },
    bgColor: {
      type: String,
      required: false,
      default: '#f04641'
    },
    cursor: {
      type: String,
      required: false,
      default: 'default'
    },
  }
};
</script>

<style lang="scss" scoped>
.oy-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.17rem;
  height: 2.17rem;
  background-color: #f04641;
  border-radius: 100%;
  transition: box-shadow 0.15s ease-in-out;

  &__is-focused {
    box-shadow: 0 0 0 3px rgba(240, 70, 65, 0.25);
  }

  &__title {
    font-weight: 600;
    color: #ffffff;
  }
}
</style>