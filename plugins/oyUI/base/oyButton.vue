<template>
  <button
    :type="buttonType"
    @click="$emit('click')"
    :class="[buttonClass, blockClass]"
    :title="alt"
  >
    <div class="icon-plus-wrapper">
      <slot name="icon">
        <i v-if="icon" :class="icon"></i>
        <component :is="svgIcon"/>
      </slot>
    </div>
       <span
         v-if="title"
       >{{ title }}</span>
  </button>
</template>

<script>
  import PassGenerateIcon from "@/components/icons/passGenerateIcon";
  import AddUserIcon from "@/components/icons/addUserIcon";
  import AddIcon from "@/components/icons/addIcon";
  import FilterIcon from "@/components/icons/filterIcon";
  import diagnoseIcon from "@/components/icons/diagnoseIcon";
  import saveIcon from "@/components/icons/saveIcon";
  import generateIcon from "@/components/icons/generateIcon";
  import activateIcon from "@/components/icons/activateIcon";
  import printIcon from "@/components/icons/printIcon";
  import deleteIcon from "@/components/icons/deleteIcon";
  import refreshIcon from "@/components/icons/refreshIcon";
  import loginIcon from "@/components/icons/loginIcon";
  import closeIcon from "@/components/icons/closeIcon";

  export default {
    components: {AddIcon, AddUserIcon, PassGenerateIcon, FilterIcon, diagnoseIcon, saveIcon, generateIcon, activateIcon, printIcon, deleteIcon, refreshIcon, loginIcon, closeIcon},
    props: {
      title: {
        type: String,
        required: false,
      },
      titleHidden: {
        type: Boolean,
        required: false,
        default: () => Boolean(0)
      },
      block: {
        type: Boolean,
        required: false,
        default: () => Boolean(0)
      },
      icon: {
        type: String,
        required: false
      },
      type: {
        type: String,
        required: false,
        default: "primary"
      },
      buttonType: {
        type: String,
        required: false,
        default: "button"
      },
      alt: {
        type: String,
        required: false
      },
      svgIcon: {
        type: String,
        required: false
      },
    },
    computed: {
      buttonClass: function () {
        return `btn btn-${this.type}`;
      },
      blockClass: function () {
        if (this.block) return "btn-block";
      }
    }
  };
</script>

<style lang="scss" scoped>
  .btn {
    display: flex;
    justify-content: center;
    align-content: center;
    padding: 0.25rem 0.5rem;
    font-weight: normal;
    .icon-plus {
      font-size: 16px;

      &-wrapper {
        padding-right: .5rem;
      }
    }
    span{
      padding-top: 2px;
    }

    &-block {
      width: 100%;
      justify-content: center;
    }
  }
</style>
