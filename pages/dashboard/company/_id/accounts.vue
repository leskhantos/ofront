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
            <div class="col account-buttons"
                 @click="showResetModal(account)">
              <oy-button
              title="Сбросить пароль"
              type="info"
              :svgIcon="'refreshIcon'"
            >
            </oy-button>
            </div>
            <div class="col account-buttons"
                 @click="showDeleteModal(account)">
              <oy-button
                title="Удалить"
                type="warning"
                :svgIcon="'deleteIcon'"
              >
              </oy-button>
            </div>
            <div class="col account-buttons">
              <oy-button
                title="Вход"
                type="primary"
                :svgIcon="'loginIcon'"
              >
              </oy-button>
              </div>
          </td>
        </tr>
        <tr v-if="!accounts.length" class="no-data text-center">
          <td colspan="14">Нет данных</td>
        </tr>
        </tbody>
      </table>
      <oy-modal
        :visible="reset_account_password"
        @close="reset_account_password = false"
        title="Сбросить пароль"
        padding="1rem"
        minWidth="350px"
      >
        <reset-account-password @success="reset_account_password = false" :account="account"/>
      </oy-modal>
      <oy-modal
        :title="'Удалить аккаунт '"
        padding="1rem"
        :visible="confirm_delete"
        @close="confirm_delete = false"
      >
        <confirm-account-delete      @close="confirm_delete = false"
                              :account="account" :company_id="company_id"/>
      </oy-modal>
    </oy-page-body>
  </oy-page>
</template>

<script>
  import storeAccount from "@/components/dashboard/company/modals/storeAccount";
  import confirmAccountDelete from "@/components/dashboard/company/modals/confirmAccountDelete";
  import moment from "moment";
  import ResetAccountPassword from "@/components/dashboard/company/modals/resetAccountPassword";

  export default {
    components: {
      ResetAccountPassword,
      storeAccount, confirmAccountDelete
    },
    name: "accounts",
    data() {
      return {
        company_id: this.$route.params.id,
        account: null
      }
    },
    methods: {
      showModal() {
        return this.set_new_account = true;
      },
      showDeleteModal(account) {
        this.account=account
        return this.confirm_delete = true;
      },
      showResetModal(account) {
        this.account=account
        return this.reset_account_password = true;
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
      reset_account_password: {
        get: function () {
          return this.$store.getters["app/reset_account_password"];
        },
        set: function (value) {
          this.$store.commit('app/RESET_ACCOUNT_PASSWORD', value);
        }
      },
      set_new_account: {
        get: function () {
          return this.$store.getters['app/set_new_account'];
        },
        set: function (value) {
          this.$store.commit('app/SET_NEW_ACCOUNT', value);
        }
      },
      confirm_delete: {
        get: function () {
          return this.$store.getters['app/confirm_delete'];
        },
        set: function (value) {
          this.$store.commit('app/CONFIRM_DELETE', value);
        }
      },
    },
    mounted() {
      this.$store.dispatch('company/getAccounts', this.company_id)
    }
  }
</script>

<style lang="scss"scoped>
  .table .account-buttons{
    :hover{
      cursor: pointer;
    }
  }
</style>
