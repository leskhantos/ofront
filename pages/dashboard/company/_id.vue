  <template>
    <div class="company-page">
    <nav class="nav nav-pills nav-fill">
      <div class="nav-item nav-link border" :class="{active: isActive('mainCompany')}" @click="switchComponents('mainCompany')">Основное</div>
      <div class="nav-item nav-link border" :class="{active: isActive('guests')}" @click="switchComponents('guests')">Гости</div>
      <div class="nav-item nav-link border" :class="{active: isActive('spots')}" @click="switchComponents('spots')">Зоны</div>
      <div class="nav-item nav-link border" :class="{active: isActive('styles')}" @click="switchComponents('styles')">Стили</div>
      <div class="nav-item nav-link border" :class="{active: isActive('accounts')}" @click="switchComponents('accounts')">Аккаунты</div>
      <div class="nav-item nav-link border" :class="{active: isActive('control')}" @click="switchComponents('control')">Управление</div>
    </nav>
      <div class="row company-page__title">
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
      </div>
      <component :is="currentTabComponent" :name="company.name" :checked="checked" :company_id="company.id"/>
    </div>
  </template>

  <script>
    import mainCompany from "../../../components/dashboard/company/mainPage";
    import guests from "../../../components/dashboard/company/guests";
    import spots from "../../../components/dashboard/company/spots";
    import styles from "../../../components/dashboard/company/styles";
    import accounts from "../../../components/dashboard/company/accounts";
    import control from "../../../components/dashboard/company/control";
    export default {
      components: {mainCompany,guests,spots ,styles,accounts,control},
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
            let data = await this.$axios.put(`company/${company_id}`, {
              name: this.newName,
              enabled: this.company.enabled
            })
             await this.$store.dispatch("company/getCompanies");
              this.flashMessage.success({
                title: "Компания обновлена",
              });
              console.log(data)
             await this.$store.dispatch("company/getCompany", this.$route.params.id);
              this.$router.push({ name: "dashboard-company-id",params:{ id: data.data.id }});
              this.newName = ""
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
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;
      &__title{
        margin-top: .5rem;
        margin-right: .1rem;
        margin-left: .1rem;
      }
      &::-webkit-scrollbar {
        width: 0.3rem;
      }

      &::-webkit-scrollbar-track {
        background-color: rgba(0, 0, 0, 0.15);
      }

      &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.15);
      }

      .active{
        background-color: #575962;
      }
    }
  </style>
