<template>
  <oy-page>
    <oy-page-header title="Аккаунты">
      <div slot="actions">
        <oy-button
          title="Добавить аккаунт"
          type="success"
          icon="icon-plus"
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
          <th scope="col">#</th>
          <th scope="col"> <i class="icon-envelope-letter"></i> Email</th>
          <th scope="col"><i class="icon-pencil"></i></th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">1</th>
          <td>test@mail.com</td>
          <td class="row">
            <div class="col"><i class="icon-refresh"></i> Сбросить пароль</div>
            <div class="col"><i class="icon-ban"></i> Удалить</div>
            <div class="col"><i class="icon-login"></i> Вход</div>
          </td>    </tr>
        <tr>
          <th scope="row">2</th>
          <td>testovich@gmail.com</td>
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
