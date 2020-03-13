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
    <oy-page-body>
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
        selectedRow: `url("data:image/svg+xml;charset=UTF-8,%3c?xml version='1.0' encoding='UTF-8'?%3e%3c!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3e%3cpath d='M1.438 16.872l-1.438 7.128 7.127-1.438 12.642-12.64-5.69-5.69-12.641 12.64zm2.271 2.253l-.85-.849 11.141-11.125.849.849-11.14 11.125zm20.291-13.436l-2.817 2.819-5.69-5.691 2.816-2.817 5.691 5.689z'/%3e%3c/svg%3e"), pointer`
      }
    },
    async asyncData ({ store }) {
      await store.dispatch('users/getUsers');
      return {}
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
