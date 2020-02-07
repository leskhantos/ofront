  <template>
    <transition name="page" mode="in-out">
      <div>
        <div>{{ company.name }}</div>

        <p>Статус: {{Boolean(company.disabled) ? 'Отключен' : 'Активный'}}</p>
        <button class="btn btn-danger" @click="deleteCompany(company.id)">Delete</button>
        <form @submit.prevent="renameCompany(company.id)">
          <div>
            <h1>Rename</h1>
            <oy-input type="text" :placeholder="company.name" v-model="newName" required></oy-input>
          </div>
        <button type="submit" class="btn btn-success">Rename</button>
        </form>
      </div>
    </transition>
  </template>

  <script>
    import OyInput from "../../../components/oyUI/base/oyInput";
    import OyButton from "../../../components/oyUI/base/oyButton";
    export default {
      components: {OyButton, OyInput},
      layout: "dashboard",
      data(){
        return{
          newName:''
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
            let payload = {
              user_id: this.$auth.user.id,
              name: this.newName
            }
            await this.$axios.put(`company/${company_id}`, payload).then((res)=>{
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
