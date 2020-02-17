<template>
  <oy-page>
    <oy-page-header title="Страницы"/>
    <oy-page-body :style="{ borderTop: '1px solid rgba(0,0,0,.1)', borderBottom: '1px solid rgba(0,0,0,.1)' }">
      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Страница</th>
          <th scope="col">Зона</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">1</th>
          <td> <i class="icon-phone"></i> default</td>
          <td>Кондратьевский проспект, 21</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td><i class="icon-envelope-letter"></i> default</td>
          <td>Кондратьевский проспект, 21</td>
        </tr>
        </tbody>
      </table>
    </oy-page-body>
  </oy-page>
</template>

<script>
    export default {
        name: "pages"
    }
</script>

<style scoped>

</style>
