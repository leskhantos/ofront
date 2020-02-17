<template>
  <oy-page>
    <oy-page-header title="Пользователи">
      <div slot="actions">
        <oy-button
          title="Добавить пользователя"
          type="success"
          icon="icon-plus"
          @click="showModal"
        >+</oy-button>
        <oy-modal
          title="Добавить пользователя"
          padding="1rem"
          :visible="set_new_user"
          @close="set_new_user = false"
        >
          <store-form />
        </oy-modal>
      </div>
    </oy-page-header>
    <oy-page-body :style="{ borderTop: '1px solid rgba(0,0,0,.1)', borderBottom: '1px solid rgba(0,0,0,.1)' }">
      <table class="responsive-table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Последний вход</th>
            <th scope="col">IP</th>
            <th scope="col" :style="{ width: '10%' }">Статус</th>
<!--            <th scope="col">EDIT</th>-->
          </tr>
        </thead>
        <tbody>
          <tr v-for="user of allUsers" :key="user.id">
            <td data-label="Имя">{{ user.name }}</td>
            <td data-label="Последний вход">{{ dateTransform(user.last_online, true) }}</td>
            <td data-label="IP">{{ user.last_ip }}</td>
            <td data-label="Статус">{{ Boolean(user.enabled) ? 'Активный' : 'Отключен' }}</td>
<!--            <td data-label="EDIT" :value="user.id"><button>Edit</button></td>-->
          </tr>
        </tbody>
      </table>
    </oy-page-body>
  </oy-page>
</template>

<script>
  import storeForm from "../../components/dashboard/users/storeForm";
  import oyButton from "../../components/oyUI/base/oyButton";
  import oyModal from "../../components/oyUI/base/oyModal";
  import oyPage from "../../components/oyUI/page/oyPage";
  import oyPageHeader from "../../components/oyUI/page/oyPageHeader";
  import oyPageBody from "../../components/oyUI/page/oyPageBody";
  import moment from 'moment';


  export default {
    layout: "dashboard",
    components: {
      storeForm,
      oyButton,
      oyModal,
      oyPageHeader,
      oyPageBody,
      oyPage
    },
    methods:{
      showModal(){
        this.$store.dispatch('users/getRoles');
        console.log(this.set_new_user)

        return  this.set_new_user = true;
      },
      dateTransform(date,time){
        return moment(date, 'YYYY-MM-DD H:mm:ss').format(time ? 'DD.MM.YYYY H:mm' : 'DD.MM.YYYY');
      }
    },
    computed:{
      set_new_user: {
        get: function() {
          return this.$store.getters["app/set_new_user"];
        },
        set: function (value) {
          this.$store.commit('app/SET_NEW_USER', value);
        }
      },
      allUsers: function() {
        return this.$store.getters["users/list"];
      },

    },
    mounted() {
      this.$store.dispatch("users/getUsers");
    }
  };
</script>
