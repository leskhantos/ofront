<template>
  <transition name="page" mode="in-out">
    <div :key="company.id">{{ company.name }}</div>
  </transition>
</template>

<script>
export default {
  layout: "dashboard",
  metaInfo() {
    return {
      titleTemplate: `%s | ${this.company.name}`
    };
  },
  async beforeRouteEnter(to, from, next) {
    this.$store.dispatch("dashboard/company/loadCompany", to.params.id);
    next();
  },
  async beforeRouteUpdate(to, from, next) {
    this.$store.dispatch("dashboard/company/loadCompany", to.params.id);
    next();
  },
  computed: {
    company: function() {
      return this.$store.getters["dashboard/company/instance"];
    }
  }
};
</script>
