  <template>
    <div class="company-page">
    <nav class="nav nav-pills nav-fill">
      <div class="nav-item nav-link border" :class="{active: isActive('mainCompany')}" @click="switchComponents('mainCompany')">Основное</div>
      <div class="nav-item nav-link border" :class="{active: isActive('guests')}" @click="switchComponents('guests')">Гости</div>
      <div class="nav-item nav-link border" :class="{active: isActive('spots')}" @click="switchComponents('spots')">Зоны</div>
      <div class="nav-item nav-link border" :class="{active: isActive('pages')}" @click="switchComponents('pages')">Страницы</div>
      <div class="nav-item nav-link border" :class="{active: isActive('accounts')}" @click="switchComponents('accounts')">Аккаунты</div>
      <div class="nav-item nav-link border" :class="{active: isActive('control')}" @click="switchComponents('control')">Управление</div>
    </nav>
      <div class="row">
        <div class="col" v-if="this.currentTabComponent==='control'">
          <h1>{{ company.name }} <i class="icon icon-pencil" @click="edit=!edit"></i></h1>
          <form @submit.prevent="renameCompany(company.id)" v-show="edit">
            <div class="input-group mb-3">
              <input type="text" class="form-control" :placeholder="company.name" v-model="newName" aria-describedby="basic-addon2">
              <div class="input-group-append">
                <button type="submit" class="btn btn-success">Сохранить</button>
              </div>
            </div>
          </form>
        </div>
        <div class="col" v-else>
          <h1>{{ company.name }}</h1>
        </div>
      </div>
      <component :is="currentTabComponent" :name="company.name" :checked="checked" :company_id="company.id"/>
    </div>
  </template>

  <script>
    import mainCompany from "../../../components/dashboard/company/main";
    import guests from "../../../components/dashboard/company/guests";
    import spots from "../../../components/dashboard/company/spots";
    import pages from "../../../components/dashboard/company/pages";
    import accounts from "../../../components/dashboard/company/accounts";
    import control from "../../../components/dashboard/company/control";
    export default {
      components: {mainCompany,guests,spots ,pages,accounts,control},
      layout: "dashboard",
      data(){
        return{
          newName:'',
          currentTabComponent: "mainCompany",
          isActiveItem: 'mainCompany',
          edit: false
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
        },
        checked:function () {
          return this.company.enabled === 1;
        }
      },
      beforeMount() {
        this.$store.dispatch("company/getCompany", this.$route.params.id);
      },
      methods:{
        switchComponents(item){
          this.isActiveItem = item;
          this.currentTabComponent = item;
        },
        isActive:function(menuItem){
          return this.isActiveItem === menuItem
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
    .company-page{
      padding: 1rem;
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 0.3rem;
      }

      &::-webkit-scrollbar-track {
        background-color: rgba(0, 0, 0, 0.15);
      }

      &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.15);
      }

      .guest-charts-card,
      .calls-charts-card {
        padding: 1rem;
        background-color: #ffffff;
        box-shadow: 0px 1px 22px -12px #607d8b;
        margin: 1rem 0;
      }
    }
  </style>
