<template>
  <oy-page>
    <oy-page-header title="Аккаунты">
      <div slot="actions">
        <oy-button
          title="Добавить аккаунт"
          type="success"
          :svgIcon="'addIcon'"
          @click=""
        >+</oy-button>
        <oy-modal
          title="Добавить аккаунт"
          padding="1rem"
        >
<!--          <storeSpot :company_id="company_id"/>-->
        </oy-modal>
      </div>
    </oy-page-header>
    <oy-page-body :style="{ borderTop: '1px solid rgba(0,0,0,.1)', borderBottom: '1px solid rgba(0,0,0,.1)' }">
      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col">Email</th>
          <th scope="col">Последний вход</th>
          <th scope="col">IP</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>test@mail.com</td>
          <td>19.02.2020 17:40:44</td>
          <td>127.0.0.1</td>
          <td class="row">
            <div class="col"><i class="icon-refresh"></i> Сбросить пароль</div>
            <div class="col"><i class="icon-ban"></i> Удалить</div>
            <div class="col"><i class="icon-login"></i> Вход</div>
          </td>
        </tr>
        <tr>
          <td>testovich@gmail.com</td>
          <td>19.02.2020 17:40:44</td>
          <td>127.0.0.1</td>
          <td class="row">
            <div class="col"><i class="icon-refresh"></i> Сбросить пароль</div>
            <div class="col"><i class="icon-ban"></i> Удалить</div>
            <div class="col"><i class="icon-login"></i> Вход</div>
          </td>
        </tr>
        </tbody>
      </table>    </oy-page-body>
  </oy-page>
</template>

<script>
    export default {
        name: "accounts"
    }
</script>

<style scoped>

</style>
