<template>
  <oy-page>
    <oy-page-body :style="{ borderBottom: '1px solid rgba(0,0,0,.1)' }">
      <form @submit.prevent="sendRequest">
        <div class="row">
          <div class="col-md-8">
            <oy-input :placeholder="'Запрос'" v-model="request"/>
          </div>
          <div class="col-md-4">
            <oy-button buttonType="submit" type="submit" title="Отправить" class="btn btn-success" :block="true"/>
          </div>
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
