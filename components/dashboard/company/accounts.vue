<template>
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
  </table>
</template>

<script>
    export default {
        name: "accounts"
    }
</script>

<style scoped>

</style>
