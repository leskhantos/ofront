<template>
  <div>
    <h6>Вы хотите удалить компанию <b>{{company.name}}</b>?</h6>
    <div class="d-flex justify-content-between">
      <button class="btn btn-danger" @click="deleteCompany">Удалить</button>
      <button class="btn btn-warning" @click="$emit('close')">Закрыть</button>
    </div>
  </div>

</template>

<script>
    export default {
        props:{
          company:{
            type:Object,
            required:false
          },
        },
      methods:{
        async deleteCompany() {
            try {
              await this.$axios.delete(`company/${this.company.id}`)
              await this.$store.dispatch("company/getCompanies");
              this.flashMessage.warning({
                title: "Компания удалена",
                position: 'left top',
                x: 550,
                y: 0
              });
              this.$router.push({name: "dashboard-statistics"});
            } catch (e) {
              this.flashMessage.error({
                title: e.response.data.message,
                position: 'left top',
                x: 550,
                y: 0
              });
            }
          }
        },
    }
</script>

<style scoped>

</style>
