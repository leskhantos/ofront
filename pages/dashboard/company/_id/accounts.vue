<template>
  <oy-page>
    <oy-page-header>
      <div slot="actions">
        <oy-button
          title="Добавить"
          type="success"
          :svgIcon="'AddIcon'"
          @click="showModal"
        >+
        </oy-button>
        <oy-modal
          title="Добавить аккаунт"
          padding="1rem"
          :visible="set_new_account"
          @close="set_new_account = false"
        >
          <storeAccount :company_id="company_id"/>
        </oy-modal>
      </div>
    </oy-page-header>
    <oy-page-body>
      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col">Email</th>
          <th scope="col">Последний вход</th>
          <th scope="col">IP</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody v-if="accounts">
        <tr v-for="account in accounts" :key="account.id">
          <td>{{ account.login }}</td>
          <td>{{ dateTransform(account.last_online, true) }}</td>
          <td>{{account.last_ip ? account.last_ip : 'нет данных'}}</td>
          <td class="row">
            <div class="col"><i class="icon-refresh"></i> Сбросить пароль</div>
            <div class="col"><i class="icon-ban"></i> Удалить</div>
            <div class="col"><i class="icon-login"></i> Вход</div>
          </td>
        </tr>
        <tr v-if="!accounts.length" class="no-data text-center">
          <td colspan="14">Нет данных</td>
        </tr>
        </tbody>
      </table>
    </oy-page-body>
  </oy-page>
</template>

<script>
  import storeAccount from "@/components/dashboard/company/modals/storeAccount";
  import moment from "moment";

  export default {
    components: {
      storeAccount
    },
    name: "accounts",
    data() {
      return {
        company_id: this.$route.params.id
      }
    },
    methods: {
      showModal() {
        return this.set_new_account = true;
      },
      dateTransform(date, time) {
        if (moment(date, 'YYYY-MM-DD H:mm:ss').isValid()) {
          return moment(date, 'YYYY-MM-DD H:mm:ss').format(time ? 'DD.MM.YYYY H:mm:ss' : 'DD.MM.YYYY');
        } else {
          return 'не заходил'
        }
      },
    },
    computed: {
      accounts: function () {
        return this.$store.getters['company/accounts']
      },
      set_new_account: {
        get: function () {
          return this.$store.getters['app/set_new_account'];
        },
        set: function (value) {
          this.$store.commit('app/SET_NEW_ACCOUNT', value);
        }
      },
    },
    mounted() {
      this.$store.dispatch('company/getAccounts', this.company_id)
    }
  }
</script>

<style scoped>

</style>
