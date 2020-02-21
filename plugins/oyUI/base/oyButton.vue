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
        <pass-generate-icon v-else-if="svgIcon==='passGenerateIcon'"/>
        <add-user-icon v-else-if="svgIcon==='addUserIcon'"/>
        <add-icon v-else-if="svgIcon==='addIcon'"/>
      </slot>
    </div>
    <span
      v-if="title"
    >{{ title }}</span>
  </button>
</template>

<script>
import PassGenerateIcon from "../../../components/icons/passGenerateIcon";
import AddUserIcon from "../../../components/icons/addUserIcon";
import AddIcon from "../../../components/icons/addIcon";
export default {
  components: {AddIcon, AddUserIcon, PassGenerateIcon},
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
    alt:{
      type: String,
      required: false
    },
    svgIcon:{
      type: String,
      required:false
    },
  },
  computed: {
    buttonClass: function() {
      return `btn btn-${this.type}`;
    },
    blockClass: function() {
      if (this.block) return "btn-block";
    }
  }
};
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  .icon-plus {
    font-size: 16px;

    &-wrapper {
    }
  }

  &-block {
    width: 100%;
    justify-content: center;
  }
}
</style>
