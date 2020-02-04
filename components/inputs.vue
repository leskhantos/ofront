<template>
  <div class="input-container" :style="{ marginBottom: marginBottom }">
    <div class="caption">
      <div class="chevron-left"></div>
      <div class="desc">{{ label }}</div>
      <div class="triangle"></div>
      <div class="triangle-border"></div>
    </div>
    <div class="field-wrapper">
      <div class="field">
        <input
          :type="type"
          :value="value"
          @input="$emit('input', $event.target.value)"
        />
        <div class="chevron-right"></div>
      </div>
      <transition name="input-error">
        <div class="error" v-if="error">{{ error }}</div>
      </transition>
    </div>
  </div>
</template>

<script>
    export default {
        name: "inputs",
      props: {
        marginBottom: {
          type: String,
          required: false,
          default: "1.5rem"
        },
        error: {
          type: String,
          required: false
        },
        type: {
          type: String,
          required: false,
          default: "text"
        },
        label: {
          type: String,
          required: true
        },
        value: {
          type: String,
          required: false,
          default: ""
        }
      }

    }
</script>

<style lang="scss" scoped>
  .input-container {
    display: flex;
    flex-direction: row;

    .caption {
      display: flex;
      position: relative;

      .triangle {
        position: absolute;
        right: -5px;
        top: 7px;
        width: 0;
        height: 0;
        border-top: 9px solid transparent;
        border-bottom: 9px solid transparent;
        z-index: 20;
        border-left: 10px solid #f04641;
      }

      .triangle-border {
        position: absolute;
        right: -6px;
        top: 9px;
        width: 0;
        height: 0;
        border-top: 7px solid transparent;
        border-bottom: 7px solid transparent;
        z-index: 19;
        border-left: 7px solid #d20000;
      }

      .desc {
        width: 110px;
        height: 33px;
        font-family: "Roboto";
        font-size: 14px;
        font-weight: 300;
        color: #fff;
        background: #f04641;
        padding-top: 8px;
        text-align: center;
        border: 1px solid #d20000;
        border-left: 0;
        line-height: 16px;
      }

      .chevron-left {
        position: absolute;
        left: -5px;
        width: 5px;
        border: 1px solid #d20000;
        border-right: 0;
        border-radius: 5px 0 0 0;
        height: 100%;
        background-color: #f04641;

        &:after {
          position: absolute;
          bottom: -11px;
          left: -1px;
          content: "";
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 5px 10px 0;
          border-color: transparent #d20000 transparent transparent;
        }
      }

      // .chevron-left {
      //   width: 5px;
      //   height: 42px;
      //   background-image: url("/auth-input-left.png");
      //   margin-left: -5px;
      // }

      // .chevron-center {
      //   width: 8px;
      //   height: 42px;
      //   background-image: url("/auth-input-center.png");
      //   z-index: 20;
      // }
    }

    .field-wrapper {
      flex: 1;
      position: relative;

      .error {
        position: absolute;
        font-weight: 300;
        font-size: 80%;
        color: #d20000;
      }

      .field {
        display: flex;

        input {
          font-family: "Roboto";
          width: 100%;
          height: 33px;
          border-width: 0;
          font-size: 14px;
          font-weight: 300;
          padding-top: 3px;
          border-top: 1px solid #dddddd;
          border-bottom: 1px solid #dddddd;
          padding-left: 20px;
          transition: 0.2s;

          &:focus {
            outline: none;
          }
        }

        .input-error {
          border-top: 1px solid #d20000 !important;
          border-bottom: 1px solid #d20000 !important;
          color: #d20000 !important;
        }

        .chevron-right {
          transition: .2s;
          position: absolute;
          right: -5px;
          width: 5px;
          border: 1px solid #dddddd;
          border-left: 0;
          border-radius: 0 5px 0 0;
          height: 100%;
          background-color: #fff;

          &:after {
            position: absolute;
            bottom: -11px;
            content: "";
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 10px 5px 0 0;
            border-color: #dddddd transparent transparent transparent;
          }

          &-error {
            border: 1px solid #d20000;
            background-color: #d20000;
            &:after {
              border-color: #d20000 transparent transparent transparent;
            }
          }
        }

        // .chevron-right {
        //   width: 8px;
        //   height: 42px;
        //   margin-right: -4px;
        //   background-image: url("/auth-input-right.png");
        //   z-index: 20;
        // }
      }
    }
  }

</style>
