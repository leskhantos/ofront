<template>
  <table class="table table-striped">
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Зона</th>
      <th scope="col">Страница</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Кондратьевский проспект, 21</td>
      <td>default</td>
      <td><span class="dot"></span></td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Кондратьевский проспект, 21</td>
      <td>default</td>
      <td><span class="dot"></span></td>
    </tr>
    </tbody>
  </table>
</template>

<script>
    export default {
        name: "zones"
    }
</script>

<style scoped>
.dot{
  height: 25px;
  width: 25px;
  background-color: green;
  border-radius: 50%;
  display: inline-block;
}
</style>
