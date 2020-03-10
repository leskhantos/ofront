<template>
  <oy-page>
    <oy-page-header>
      <div slot="actions">
        <div class="d-flex justify-content-end">
            <label :style="{paddingRight:'1rem'}">
              <input type="checkbox" v-model="showDisabledUsers"/>
              <span>Показывать отключенных</span>
            </label>
            <oy-button
              title="Добавить"
              type="success"
              @click="showModal"
              :svgIcon="'AddUserIcon'"
            >
            </oy-button>
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
    <oy-page-body :style="{ borderBottom: '1px solid rgba(0,0,0,.1)' }">
      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col">Имя</th>
          <th scope="col">IP</th>
          <th scope="col">Последний вход</th>
          <th scope="col" :style="{ width: '10%', textAlign:'center'}">Статус</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user of allUsers" :style="{cursor: selectedRow}" :key="user.id" @click="showUpdate(user)">
          <td data-label="Имя">{{ user.name }}</td>
          <td data-label="IP">{{ user.last_ip ? user.last_ip : 'нет данных' }}</td>
          <td data-label="Последний вход">{{ dateTransform(user.last_online, true) }}</td>
          <td data-label="Статус" style="text-align: center">
            <oy-dot :active-color="user.enabled ? '#37a967': 'red'"/>
          </td>
        </tr>
        </tbody>
      </table>
    </oy-page-body>
  </oy-page>
</template>

<script>
  import storeForm from "@/components/dashboard/users/storeUser";
  import updateUser from "@/components/dashboard/users/updateUser";
  import moment from 'moment';


  export default {
    layout: "dashboard",
    data() {
      return {
        user: null,
        showDisabledUsers: false,
        selectedRow: `url("data:image/svg+xml;charset=UTF-8,%3c?xml version='1.0' encoding='UTF-8'?%3e%3c!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' width='24' height='24' viewBox='0 0 24 24'%3e%3cpath fill='%23000000' d='M16.84,2.73C16.45,2.73 16.07,2.88 15.77,3.17L13.65,5.29L18.95,10.6L21.07,8.5C21.67,7.89 21.67,6.94 21.07,6.36L17.9,3.17C17.6,2.88 17.22,2.73 16.84,2.73M12.94,6L4.84,14.11L7.4,14.39L7.58,16.68L9.86,16.85L10.15,19.41L18.25,11.3M4.25,15.04L2.5,21.73L9.2,19.94L8.96,17.78L6.65,17.61L6.47,15.29' /%3e%3c/svg%3e"), pointer`
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
        if (this.showDisabledUsers) {
          return this.$store.getters["users/list"];
        } else {
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
 tbody tr:hover{
    cursor: pointer;
  }
</style>
