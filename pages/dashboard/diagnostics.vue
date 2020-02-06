<template>
  <form @submit.prevent="">
    <div class="row">
      <oy-input label="Запрос"></oy-input>
      <oy-button title="Отправить" type="success"/>
    </div>
  </form>

</template>

<script>
import OyInput from "../../components/oyUI/base/oyInput";
import OyButton from "../../components/oyUI/base/oyButton";
export default {
  components: {OyButton, OyInput},
  layout: "dashboard",
  metaInfo() {
    return {
      titleTemplate: '%s | Диагностика'
    };
  }
};
</script>
