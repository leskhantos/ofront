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
  export default {
    layout: "dashboard",
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
