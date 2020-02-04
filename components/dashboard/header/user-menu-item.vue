<template>
  <li class="user-menu__dropdown--item" @click="$emit('click')">
    <ant-icon :type="anticon" v-if="anticon" />
    <i v-if="!anticon && icon" :class="icon" />
    <span :class="{ 'ml-2': anticon || icon }">{{ title }}</span>
  </li>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: "Новый пункт меню"
    },
    anticon: {
      type: String,
      required: false
    },
    icon: {
      type: String,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
.user-menu__dropdown--item {
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
}
</style>