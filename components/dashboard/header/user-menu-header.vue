<template>
  <div slot="header" class="d-flex align-items-center">
    <oy-avatar :focused="focused" :title="title" />
    <div class="ml-3">
      <div :style="{ fontWeight: '600', fontSize: '95%' }">{{ user.name }} {{ user.surname }}</div>
      <div :style="{ fontSize: '80%' }">Администратор</div>
    </div>
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
          required: true
      },
      user: {
          type: Object,
          required: true
      }
  }
};
</script>