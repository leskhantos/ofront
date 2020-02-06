  <template>
    <transition name="page" mode="in-out">
      <div>
        <div>{{ company.name }}</div>

        <p>Статус: {{Boolean(company.disabled) ? 'Отключен' : 'Активный'}}</p>
      </div>
    </transition>
  </template>

  <script>
    export default {
      layout: "dashboard",
      validate ({ params }) {
        // Должен быть числом
        return /^\d+$/.test(params.id)
      },
      metaInfo() {
        return {
          titleTemplate: `%s | ${this.company.name}`
        };
      },
      computed: {
        company: function() {
          return this.$store.getters["company/company"];
        }
      },
      beforeMount() {
        this.$store.dispatch("company/getCompany", this.$route.params.id);
      },
    };
  </script>
