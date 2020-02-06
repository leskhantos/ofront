<template>
  <nuxt-link :to="route" class="sidebar-link" :class="{
    'active': active
  }">
    <i :class="icon ? `${icon} mr-3` : ''" v-if="icon"></i>
    <div class="sidebar-link__title">{{ title }}</div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: false,
      default: "link"
    },
    route: {
      type: Object,
      required: false,
      default: () => {
        return { name: 'dashboard-not-found' };
      }
  }
  },
  methods:{
    getFirstObjectKeyValue(obj){
      const key = Object.keys(obj)[0];
      return obj[key];
    }
  },
  computed: {
    active: function () {
      if (this.route.params === undefined) return this.$route.name === this.route.name;
      else {
        const prop_param = this.getFirstObjectKeyValue(this.route.params);
        const url_param = this.getFirstObjectKeyValue(this.$route.params);
        return String(prop_param) === String(url_param);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar-link {
  font-size: 14px;
  padding: 10px 35px;
  color: rgba(255, 255, 255, 0.5);
  transition: 0.2s;
  display: flex;
  align-items: center;

  &:focus {
    outline: none;
  }

  & > i {
    transition: 0.2s;
  }

  &:hover {
    text-decoration: none;
    background-color: rgba(0, 0, 0, 0.2);
    color: rgba(255, 255, 255, 0.5);

    & > i {
      color: #fff;
    }
  }

  &__title {
    flex: 1;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
}

.active {
  color: #ffffff;
  &:hover {
    color: #ffffff !important;
  }
}
</style>
