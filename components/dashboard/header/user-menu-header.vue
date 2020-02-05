<template>
  <div slot="header" class="d-flex align-items-center">
    <oyAvatar :focused="focused" :title="title"/>
    <div class="ml-3">
      <div :style="{ fontWeight: '600', fontSize: '95%' }">{{ this.$auth.user.name }} {{ this.$auth.user.surname }}</div>
      <div :style="{ fontSize: '80%' }">Администратор</div>
    </div>
  </div>
</template>

<script>
import oyAvatar from "../../oyUI/base/oyAvatar";
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
  },
    components:{
      oyAvatar
    }
};
</script>
