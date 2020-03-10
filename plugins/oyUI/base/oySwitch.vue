<template>
  <div class="row" :style="{ paddingBottom:'.5rem'}">
    <div class="col-md-2">
      <h5>{{ title }}:</h5>
    </div>
    <div class="col-md-10">
      <span class="switch">
        <input type="checkbox" class="switch" id="switch-normal" v-model="val" :checked="val"
               @change="change()">
        <label for="switch-normal"></label>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      checked: {
        type: [Boolean, Number],
        required: false
      },
      title: {
        type: String,
        required: false
      }
    },
    data() {
      return {
        val: null
      }
    },
    methods: {
      change: function () {
        this.$emit('input', this.val);
      }
    },
    created() {
      this.val = this.checked
    }
  }
</script>

<style lang="scss" scoped>

  $font-size-base: 1rem;
  $font-size-lg: ($font-size-base * 1.25);
  $font-size-sm: ($font-size-base * .875);
  $input-height: 2.375rem;
  $input-height-sm: 1.9375rem;
  $input-height-lg: 3rem;
  $input-btn-focus-width: .2rem;
  $custom-control-indicator-bg: #dee2e6;
  $custom-control-indicator-disabled-bg: #e9ecef;
  $custom-control-description-disabled-color: #868e96;
  $white: white;
  $theme-colors: (
    'primary': #37a967
  );

  $switch-height: calc(#{$input-height} * .8) !default;
  $switch-height-sm: calc(#{$input-height-sm} * .8) !default;
  $switch-height-lg: calc(#{$input-height-lg} * .8) !default;
  $switch-border-radius: $switch-height !default;
  $switch-bg: $custom-control-indicator-bg !default;
  $switch-checked-bg: map-get($theme-colors, 'primary') !default;
  $switch-disabled-bg: $custom-control-indicator-disabled-bg !default;
  $switch-disabled-color: $custom-control-description-disabled-color !default;
  $switch-thumb-bg: $white !default;
  $switch-thumb-border-radius: 50% !default;
  $switch-thumb-padding: 2px !default;
  $switch-focus-box-shadow: 0 0 0 $input-btn-focus-width rgba(map-get($theme-colors, 'primary'), .25);
  $switch-transition: .2s all !default;

  .switch {
    font-size: $font-size-base;
    position: relative;

    input {
      position: absolute;
      height: 1px;
      width: 1px;
      background: none;
      border: 0;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      overflow: hidden;
      padding: 0;

      + label {
        position: relative;
        min-width: calc(#{$switch-height} * 2);
        border-radius: $switch-border-radius;
        height: $switch-height;
        line-height: $switch-height;
        display: inline-block;
        cursor: pointer;
        outline: none;
        user-select: none;
        vertical-align: middle;
        text-indent: calc(calc(#{$switch-height} * 2) + .5rem);
      }

      + label::before,
      + label::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: calc(#{$switch-height} * 2);
        bottom: 0;
        display: block;
      }

      + label::before {
        right: 0;
        background-color: $switch-bg;
        border-radius: $switch-border-radius;
        transition: $switch-transition;
      }

      + label::after {
        top: $switch-thumb-padding;
        left: $switch-thumb-padding;
        width: calc(#{$switch-height} - calc(#{$switch-thumb-padding} * 2));
        height: calc(#{$switch-height} - calc(#{$switch-thumb-padding} * 2));
        border-radius: $switch-thumb-border-radius;
        background-color: $switch-thumb-bg;
        transition: $switch-transition;
      }

      &:checked + label::before {
        background-color: $switch-checked-bg;
      }

      &:checked + label::after {
        margin-left: $switch-height;
      }

      &:focus + label::before {
        outline: none;
        box-shadow: $switch-focus-box-shadow;
      }

      &:disabled + label {
        color: $switch-disabled-color;
        cursor: not-allowed;
      }

      &:disabled + label::before {
        background-color: $switch-disabled-bg;
      }
    }

  }

</style>
