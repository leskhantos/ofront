<template>
  <div class="d-flex justify-content-between"
       :class="[errorClass]"
  >
      <h6 class="mr-auto">{{ title }}</h6>
    <label>
      <input :value="value" class="form-control form-control-sm"
             @input="$emit('input', $event.target.value)"
             @keyup.enter="$emit('sendEnter')"
             :style="{paddingRight:'.2rem'}"/>
    </label>
    <p>{{ unit }}</p>
    <transition name="input-error">
      <small v-if="error" class="error">{{ error[0] }}</small>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "setting-item",
    props: {
      title: {
        type: String,
        required: false
      },
      value: {
        type: [String, Number],
        required: false
      },
      unit:{
        type: String,
        required: false
      },
      error: {
        type: Array,
        required: false
      },
    },
    computed: {
      errorClass: function () {
        if (this.error) return "has-error";
      }
    }
  }
</script>

<style scoped lang="scss">
  .error {
    position: absolute;
    color: #dc3545;
    bottom: -1.1rem;
  }
  .has-error {
    input{
      border-color: #dc3545 !important;
    }
  }
</style>
