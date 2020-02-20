<template>
  <oy-page>
    <oy-page-header/>
    <oy-page-body :style="{ borderTop: '1px solid rgba(0,0,0,.1)', borderBottom: '1px solid rgba(0,0,0,.1)' }">
       <h1>Настройки</h1>
    </oy-page-body>
  </oy-page>
</template>

<script>
export default {
  layout: "dashboard",
  metaInfo() {
    return {
      titleTemplate: "%s | Настройки"
    };
  }
};
</script>
