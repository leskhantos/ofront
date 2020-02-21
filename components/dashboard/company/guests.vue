<template>
  <oy-page>
    <oy-page-header/>
    <oy-page-body :style="{ borderBottom: '1px solid rgba(0,0,0,.1)' }">
      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col">Дата и время</th>
          <th scope="col">Гость</th>
          <th scope="col">Авторизация</th>
          <th scope="col" style="text-align: center">Визиты</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>14.02.2020 08:45:49</td>
          <td><devices-icon/>  6C:C7:EC:8E:B8:37</td>
          <td>@session</td>
          <td  style="text-align: center">2</td>
        </tr>
        <tr>
          <td>14.02.2020 08:45:49</td>
          <td><devices-icon/>  6C:C7:EC:8E:B8:37</td>
          <td>@session</td>
          <td  style="text-align: center">2</td>
        </tr>
        <tr>
          <td>14.02.2020 08:45:49</td>
          <td><devices-icon/>  6C:C7:EC:8E:B8:37</td>
          <td>@session</td>
          <td  style="text-align: center">2</td>
        </tr>
        </tbody>
      </table>
    </oy-page-body>
  </oy-page>
</template>

<script>
    import DevicesIcon from "../../icons/devicesIcon";
    export default {
        name: "guests",
      components: {DevicesIcon}
    }
</script>

<style scoped>

</style>
