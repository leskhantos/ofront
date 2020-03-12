<template>
  <oy-page>
    <oy-page-body>
      <form @submit.prevent="sendRequest">
        <div class="d-flex justify-content-center">
          <oy-input :placeholder="'Запрос'" v-model="request" class="col-lg-5"/>
          <oy-button :style="{marginBottom:'1.2rem'}" :svgIcon="'diagnoseIcon'"
                     buttonType="submit" type="submit" title="Отправить" class="btn btn-success col-lg-2"
                     :block="true"/>
        </div>
      </form>
    </oy-page-body>
  </oy-page>
</template>

<script>
  import oyPage from "../../plugins/oyUI/page/oyPage";
  import oyPageHeader from "../../plugins/oyUI/page/oyPageHeader";
  import oyPageBody from "../../plugins/oyUI/page/oyPageBody";

  export default {
    layout: "dashboard",
    components: {
      oyPage, oyPageHeader, oyPageBody
    },
    data() {
      return {
        request: ''
      }
    },
    metaInfo() {
      return {
        titleTemplate: '%s | Диагностика'
      };
    },
    methods: {
      sendRequest() {
        console.log('request send')
      }
    }
  };
</script>
