<template>
  <oy-page>
    <oy-page-header/>
    <oy-page-body :style="{ borderTop: '1px solid rgba(0,0,0,.1)', borderBottom: '1px solid rgba(0,0,0,.1)' }">
          <div class="row company-page__title">
            <div class="col">
              <h1>{{ company.name }} <span @click="edit=!edit"><edit-company-icon/></span></h1>
              <form @submit.prevent="renameCompany(company.id)" v-show="edit">
                <div class="input-group mb-3">
                  <input type="text" class="form-control" :placeholder="company.name" v-model="newName"
                         aria-describedby="basic-addon2">
                  <div class="input-group-append">
                    <button type="submit" class="btn btn-success">Сохранить</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
      <div class="row" :style="{paddingBottom: '2rem', paddingTop: '1rem'}">
        <div class="col-md-1">
          <p>Включен:</p>
        </div>
        <div class="col-md-11">
          <div class="switch">
            <input class="switch" id="switch" name="switch" type="checkbox" v-model="checkVal" :checked="checked"/>
            <label data-off="" data-on="" for="switch"></label>
          </div>
        </div>
      </div>
      <button class="btn btn-danger" @click="deleteCompany">
        Удалить
      </button>
    </oy-page-body>
  </oy-page>
</template>

<script>
    import editCompanyIcon from "../../../../components/icons/editCompanyIcon";
    export default {
      components:{editCompanyIcon},
      data() {
        return {
          checkVal: '',
          company_id: this.$route.params.id,
          newName:'',
          edit: false,
        }
      },
      computed:{
        company: function () {
          return this.$store.getters["company/company"];
        },
        checked: function () {
          return this.company.enabled === 1;
        }
      },
      methods: {
        async deleteCompany() {
          let del = confirm("Уверены ?");
          if (del) {
            try {
              await this.$axios.delete(`company/${this.company_id}`)
              await this.$store.dispatch("company/getCompanies");
              this.flashMessage.warning({
                title: "Компания удалена",
              });
              this.$router.push({name: "dashboard-statistics"});
            } catch (e) {
              this.flashMessage.error({
                title: e.response.data.message,
              });
            }
          }
        },
        async changeStatus() {
          try {
            await this.$axios.put(`company/${this.company_id}`, {
              name: this.company.name,
              enabled: this.checkVal
            })
            await this.$store.dispatch("company/getCompanies");
          } catch (e) {
            console.log(e.response)
          }
        },
        async renameCompany(company_id) {
          try {
            let data = await this.$axios.put(`company/${company_id}`, {
              name: this.newName,
              enabled: this.company.enabled
            })
            await this.$store.dispatch("company/getCompanies");
            this.flashMessage.success({
              title: "Компания обновлена",
            });
            await this.$store.dispatch("company/getCompany", this.$route.params.id);
            this.$router.push({name: "dashboard-company-id-main", params: {id: data.data.id}});
            this.newName = ""
          } catch (e) {
            this.flashMessage.error({
              title: e.response.data.message,
            });
          }
        }
      },
      mounted() {
        this.checkVal=this.checked
      },
      watch: {
        checkVal:{
          immediate:false,
          handler(val) {
            this.changeStatus(val)
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
  $gray: lightgray;
  $blue: #007bff;
  $height: 28px;
  $width: $height * 2;

  .row button {
    margin-bottom: 18px;
    margin-top: 25px;
    padding: 0 0 0 30px;
  }

  .switch input[type=checkbox] {
    height: 0;
    width: 0;
    visibility: hidden;
  }

  div.switch.float-right {
    margin-top: -15px;
  }

  .switch label {
    cursor: pointer;
    width: $width;
    height: $height;
    background: $gray;
    display: block;
    border-radius: $height / 4;
    position: relative;
    margin: -1.1em 0px 0px;
  }

  .switch label:before {
    content: attr(data-off);
    position: absolute;
    top: $height * .05;
    right: 0;
    font-size: $height * .3;
    padding: ($height / 4) ($height / 4);
    color: white;
  }

  .switch input:checked + label:before {
    content: attr(data-on);
    position: absolute;
    left: 0;
    font-size: $height * .3;
    padding-left: $height / 4;
    color: white;
  }

  .switch label:after {
    content: '';
    position: absolute;
    top: $height * .05;
    left: $height * .05;
    width: $height * .9;
    height: $height * .9;
    background: #fff;
    border-radius: $height / 5;
  }

  .switch input:checked + label {
    background: $blue;
  }

  .switch input:checked + label:after {
    transform: translateX($width - $height);
  }
</style>
