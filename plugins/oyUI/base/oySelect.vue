<template>
  <div class="oy-select" :class="[ errorClass ]">
    <label :style="{ marginBottom: '0.3rem'}" v-if="label">{{ label }}</label>
    <select
      class="form-control form-control-sm "
      style="min-width:100%"
      @change="$emit('childToParent', $event.target.value)"
    >
      <option selected value="all" :disabled="disabled" v-if="firstOption">{{ firstOption }}</option>
      <option
        :key="option.id"
        :value="option.id"
        :selected="option.id === selected"
        v-for="option in options"
      >{{ option.name || option.address || option.id }}
      </option>
    </select>
    <transition name="select-error">
      <small v-if="error" class="oy-input__error">{{ error[0] }}</small>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "oySelect",
    props: {
      label: {
        type: String,
        required: false
      },
      firstOption: {
        type: String,
        required: false
      },
      error: {
        type: Array,
        required: false
      },
      options: {
        type: Array,
        required: false
      },
      selected: {
        type: [String, Number],
        required: false
      },
      disabled: {
        type: Boolean,
        required: false,
        default: true
      }
    },
    computed: {
      errorClass: function () {
        if (this.error) return "has-error";
      }
    }
  }
</script>

<style lang="scss" scoped>
  .oy-select {
    position: relative;
    padding-right: 1rem;
    /*margin-bottom: 1.2rem;*/

    label {
      margin-bottom: 0.3rem;
    }

    small {
      color: #dc3545;
    }
  }

  .has-error {
    input,
    select {
      border-color: #dc3545 !important;
    }
  }
</style>
