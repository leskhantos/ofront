<template>
  <div slot="header" class="d-flex align-items-center">
    <oyAvatar :focused="focused" :title="title"/>
    <div class="ml-3">
      <div :style="{ fontWeight: '600', fontSize: '95%' }">{{ this.user.name }}</div>
      <div :style="{ fontSize: '80%' }">{{ role }}</div>
    </div>
  </div>
</template>

<script>
  import oyAvatar from "@/plugins/oyUI/base/oyAvatar";

  export default {
    data() {
      return {
        user: {}
      }
    },
    components: {
      oyAvatar
    },
    computed: {
      role: function () {
        switch (this.user.type){
          case 'admin':
            return 'Администратор';
          case 'manager':
            return 'Менеджер';
          default:
            return 'Поддержка';
        }
      }
    },
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
    mounted() {
      this.user = this.$store.getters["users/user"]
    }
  };
</script>
