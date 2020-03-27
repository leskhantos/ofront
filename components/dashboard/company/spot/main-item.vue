<template>
  <div class="row"
       :class="[errorClass]"
  >
    <h5 class="mr-auto">{{ title }}</h5>
    <div class="d-flex flex-column justify-content-start col-lg-6">
      <label class="d-flex">
        <input :value="value" class="form-control form-control-sm"
               @input="$emit('input', $event.target.value)"
               @keyup.enter="$emit('sendEnter')"
               :style="{paddingRight:'.2rem'}"/>
      </label>
      <transition name="input-error">
        <small v-if="error" class="error">{{ error[0] }}</small>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: "main-item",
    props: {
      title: {
        type: String,
        required: false
      },
      value: {
        type: [String, Number],
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

<style lang="scss" scoped>
  h5{
    padding-left: 1rem;
  }
  .error {
    position: relative;
    color: #dc3545;
    margin-top: -8px;
  }
  .has-error {
    label input{
      border-color: #dc3545 !important;
    }
  }
</style>
