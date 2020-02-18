<template>
  <oy-page>
    <oy-page-header title="Диагностика"/>
    <oy-page-body :style="{ borderTop: '1px solid rgba(0,0,0,.1)', borderBottom: '1px solid rgba(0,0,0,.1)' }">
      <h1>Диагностика</h1>
    </oy-page-body>
  </oy-page>
</template>

<script>
import oyPage from "../../plugins/oyUI/page/oyPage";
import oyPageHeader from "../../plugins/oyUI/page/oyPageHeader";
import oyPageBody from "../../plugins/oyUI/page/oyPageBody";
export default {
  layout: "dashboard",
  components:{
    oyPage,oyPageHeader,oyPageBody
  },
  metaInfo() {
    return {
      titleTemplate: '%s | Диагностика'
    };
  }
};
</script>
