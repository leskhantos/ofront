<template>
  <oy-page>
    <oy-page-header>
      <div slot="actions">
        <div class="row">
          <div class="col">
            <label>
              <input type="checkbox"  v-model="showDisabledUsers"/>
              <span>Показывать отключенных</span>
            </label>
          </div>
          <div class="col">
            <oy-button
              title="Добавить пользователя"
              type="success"
              @click="showModal"
              :svgIcon="'AddUserIcon'"
            >
            </oy-button>
          </div>
        </div>
        <oy-modal
          title="Добавить пользователя"
          padding="1rem"
          :visible="set_new_user"
          @close="set_new_user = false"
        >
          <store-form/>
        </oy-modal>
        <oy-modal
          title="Обновить пользователя"
          padding="1rem"
          :visible="set_update_user"
          @close="set_update_user = false"
        >
          <update-user :user="this.user"/>
        </oy-modal>
      </div>
    </oy-page-header>
    <oy-page-body :style="{ borderTop: '1px solid rgba(0,0,0,.1)', borderBottom: '1px solid rgba(0,0,0,.1)' }">
      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col">Имя</th>
          <th scope="col">IP</th>
          <th scope="col">Последний вход</th>
          <th scope="col" :style="{ width: '10%', textAlign:'center'}">Статус</th>
          <!--            <th scope="col">EDIT</th>-->
        </tr>
        </thead>
        <tbody>
        <tr v-for="user of allUsers" :key="user.id" @click="showUpdate(user)">
          <td data-label="Имя">{{ user.name }}</td>
          <td data-label="IP">{{ user.last_ip }}</td>
          <td data-label="Последний вход">{{ dateTransform(user.last_online, true) }}</td>
          <td data-label="Статус" style="text-align: center"><oy-dot :active-color="user.enabled ? '#37a967': 'red'"/></td>
        </tr>
        </tbody>
      </table>
    </oy-page-body>
  </oy-page>
</template>

<script>
  import storeForm from "../../components/dashboard/users/storeUser";
  import updateUser from "../../components/dashboard/users/updateUser";
  import moment from 'moment';


  export default {
    layout: "dashboard",
    data() {
      return {
        user: null,
        showDisabledUsers: false
      }
    },
    components: {
      storeForm, updateUser
    },
    methods: {
      showModal() {
        return this.set_new_user = true;
      },
      dateTransform(date, time) {
        if (moment(date, 'YYYY-MM-DD H:mm:ss').isValid()) {
          return moment(date, 'YYYY-MM-DD H:mm:ss').format(time ? 'DD.MM.YYYY H:mm:ss' : 'DD.MM.YYYY');
        } else {
          return 'не заходил'
        }
      },
      showUpdate(user) {
        this.$store.dispatch('users/getTypes');
        this.user = user
        return this.set_update_user = true;
      }
    },
    computed: {
      set_new_user: {
        get: function () {
          return this.$store.getters["app/set_new_user"];
        },
        set: function (value) {
          this.$store.commit('app/SET_NEW_USER', value);
        }
      },
      set_update_user: {
        get: function () {
          return this.$store.getters["app/set_update_user"];
        },
        set: function (value) {
          this.$store.commit('app/SET_UPDATE_USER', value);
        }
      },
      allUsers: function () {
        if (this.showDisabledUsers){
          return this.$store.getters["users/list"];
        }else {
          return this.$store.getters["users/activeUsers"];
        }
      },

    },
    mounted() {
      this.$store.dispatch("users/getUsers");
    }
  };
</script>
<style lang="scss" scoped>
  input[type='checkbox'] {
    position: relative;
    top: 1px;
  }
</style>
