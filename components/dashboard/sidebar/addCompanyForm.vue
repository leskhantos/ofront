<template>
  <form >
    <div class="row">
      <oy-input
        label="Наименование компании"

      />
    </div>
    <div class="row">
      <oy-input
        label="Имя зоны"
      />
      <oy-input
        label="Адрес подключения"

      />
    </div>
    <div class="row">
      <oy-input
        label="Идентификатор"
      />
      <!-- <oy-input
        label="Тип авторизации"
        v-model="form.spot.type"
        input-class="col-lg-6"
        :options="types"
        :error="$store.state.errors.list['company:spot.type']"
      />-->

      <div class="col-lg-6">
        <label :style="{ marginBottom: '0.3rem' }">Тип авторизации</label>
        <select
          class="form-control form-control-sm"
        >
          <option
      ></option>
        </select>
      </div>
    </div>

    <div class="mt-3">
      <oy-button type="success" buttonType="submit" title="Сохранить" :block="true" />
    </div>
  </form>
</template>

<script>
export default {

};
</script>
