<template>
  <div class="row"
       :class="[errorClass]"
  >
    <h6 class="mr-auto">{{ title }}</h6>
    <div class="d-flex flex-column justify-content-start col-lg-6">
      <label class="d-flex">
        <input :value="value" class="form-control form-control-sm"
               @input="$emit('input', $event.target.value)"
               @keyup.enter="$emit('sendEnter')"
               :style="{paddingRight:'.2rem'}"/>
        {{unit}}
      </label>
      <transition name="input-error">
        <small v-if="error" class="error">{{ error[0] }}</small>
      </transition>
    </div>
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
  h6{
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
