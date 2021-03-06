<template>
  <div
    class="oy-input"
    :style="{ marginBottom: mb }"
    :class="[orientationClass, inputClass, errorClass]"
  >
    <label v-if="label">{{ label }}</label>
    <input
      ref="input"
      class="form-control form-control-sm"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @keyup.enter="$emit('sendEnter')"
      :type="type"
      v-if="!options"
      :placeholder="placeholder"
      :required="required"
      @focus="$emit('focus')"
    />
    <transition name="input-error">
      <small v-if="error" class="oy-input__error">{{ error[0] }}</small>
    </transition>
  </div>
</template>

<script>
  export default {
    props: {
      label: {
        type: String,
        required: false
      },
      orientation: {
        type: String,
        required: false,
        default: "vertical"
      },
      mb: {
        type: String,
        required: false,
        default: "1.2rem"
      },
      inputClass: {
        type: String,
        required: false
      },
      value: {
        type: [String, Number],
        required: false
      },
      type: {
        type: String,
        required: false,
        default: "text"
      },
      options: {
        type: Array,
        required: false
      },
      error: {
        type: Array,
        required: false
      },
      required: {
        type: Boolean,
        required: false
      },
      placeholder: {
        type: String,
        required: false
      },
      focus:{
        type: Boolean,
        required: false,
        default: false
      }
    },
    computed: {
      orientationClass: function () {
        return `${this.orientation}-orientation`;
      },
      errorClass: function () {
        if (this.error) return "has-error";
      }
    },
    mounted(){
      if (this.focus){
        this.$refs.input.focus();
      }
    }
  };
</script>

<style lang="scss" scoped>
  .oy-input {
    position: relative;

    label {
      margin-bottom: 0.3rem;
    }

    &__error {
      position: absolute;
      color: #dc3545;
      bottom: -1.1rem;
    }
  }

  .has-error {
    input,
    select {
      border-color: #dc3545 !important;
    }
  }

  .horizontal-orientation {
    display: flex;
    align-items: center;

    label {
      margin-right: 1rem;
      margin-bottom: 0.2rem;
    }
  }

  .vertical-orientation {
    display: flex;
    flex-direction: column;
  }

  .horizontal-orientation {
    flex-direction: row;
  }
</style>
