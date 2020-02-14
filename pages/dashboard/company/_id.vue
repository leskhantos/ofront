  <template>
    <div>
    <nav class="nav nav-pills nav-fill">
      <div class="nav-item nav-link border" @click="currentTabComponent='mainCompany'">Основное</div>
      <div class="nav-item nav-link border" @click="currentTabComponent='guests'">Гости</div>
      <div class="nav-item nav-link border" @click="currentTabComponent='zones'">Зоны</div>
      <div class="nav-item nav-link border" @click="currentTabComponent='pages'">Страницы</div>
      <div class="nav-item nav-link border" @click="currentTabComponent='accounts'">Аккаунты</div>
    </nav>
      <component :is="currentTabComponent" :name="company.name" :checked="company.enabled"/>
    </div>
  </template>

  <script>
    import OyInput from "../../../components/oyUI/base/oyInput";
    import OyButton from "../../../components/oyUI/base/oyButton";
    import mainCompany from "../../../components/dashboard/company/main";
    import guests from "../../../components/dashboard/company/guests";
    import zones from "../../../components/dashboard/company/zones";
    import pages from "../../../components/dashboard/company/pages";
    import accounts from "../../../components/dashboard/company/accounts";
    export default {
      components: {OyButton, OyInput,mainCompany,guests,zones,pages,accounts},
      layout: "dashboard",
      data(){
        return{
          newName:'',
          currentTabComponent: "mainCompany"
        }
      },
      validate ({ params }) {
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
      methods:{
       async deleteCompany(company_id){
          try {
            await this.$axios.delete(`company/${company_id}`).then((res)=>{
              this.$store.dispatch("company/getCompanies");
              this.flashMessage.success({
                title: "Компания удалена",
              });
              this.$router.push({ name: "dashboard-users"});
            })
          } catch (e) {
            this.flashMessage.error({
              title: e.response.data.message,
            });
          }
        },
        async renameCompany(company_id){
          try {
            await this.$axios.put(`company/${company_id}`, {
              user_id: this.$store.state.users.user.id,
              name: this.newName
            }).then((res)=>{
              this.$store.dispatch("company/getCompanies");
              this.flashMessage.success({
                title: "Компания обновлена",
              });
              this.$store.dispatch("company/getCompany", this.$route.params.id);
              this.$router.push({ name: "dashboard-company-id",params:{ id:res.data.id }});
              this.newName = ""
            })
          } catch (e) {
            this.flashMessage.error({
              title: e.response.data.message,
            });
          }
        }
      }
    };
  </script>
  <style lang="scss" scoped>

  </style>
