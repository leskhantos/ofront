<template>
  <oy-page>
    <oy-page-header title="Пользователи">
      <div slot="actions">
        <oy-button
          title="Добавить пользователя"
          type="success"

          icon="icon-plus"
        >
          <ant-icon type="user-add" slot="ant-icon" />
        </oy-button>
        <oy-modal
          title="Добавить пользователя"
          padding="1rem"
        >
          <store-form />
        </oy-modal>
      </div>
    </oy-page-header>
    <oy-page-body :style="{ borderTop: '1px solid rgba(0,0,0,.1)', borderBottom: '1px solid rgba(0,0,0,.1)' }">
      <table class="responsive-table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Последний вход</th>
            <th scope="col">IP</th>
            <th scope="col" :style="{ width: '10%' }">Статус</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="Имя"> user.surname user.name </td>
            <td data-label="Последний вход">utils.humanDatetime(user.last_login, true) </td>
            <td data-label="IP">user.last_ip </td>
            <td data-label="Статус">Отключен : 'Активный</td>
          </tr>
        </tbody>
      </table>
    </oy-page-body>
  </oy-page>
</template>

<script>
import storeForm from "@/components/dashboard/users/storeForm.vue";
export default {
  layout: "dashboard",
  data: () => ({
    newUserMode: false
  }),

  components: {
    storeForm
  }
};
</script>
