export const state = () => ({
  stats: {},
  smsPerMonth: [],
  callsPerMonth: [],
  vouchersPerMonth: [],
  callsByCompanyPerMonth: [],
  guestsByCompanyPerMonth: [],
  vouchersByCompanyPerMonth: [],
  allDataByCompany: {}
});

export const getters = {
  stats(state) {
    return state.stats;
  },
  smsPerMonth(state) {
    return state.smsPerMonth;
  },
  callsPerMonth(state) {
    return state.callsPerMonth;
  },
  vouchersPerMonth(state) {
    return state.vouchersPerMonth;
  },
  callsByCompanyPerMonth(state) {
    return state.callsByCompanyPerMonth;
  },
  guestsByCompanyPerMonth(state) {
    return state.guestsByCompanyPerMonth;
  },
  vouchersByCompanyPerMonth(state) {
    return state.vouchersByCompanyPerMonth;
  },
  allDataByCompany(state) {
    return state.allDataByCompany;
  }
};

export const mutations = {
  SET_ALL_STATS(state, stats) {
    state.stats = stats;
  },
  SET_ALL_SMS_PER_MONTH(state, smsPerMonth) {
    state.smsPerMonth = smsPerMonth;
  },
  SET_ALL_CALLS_PER_MONTH(state, callsPerMonth) {
    state.callsPerMonth = callsPerMonth;
  },
  SET_ALL_VOUCHERS_PER_MONTH(state, vouchersPerMonth) {
    state.vouchersPerMonth = vouchersPerMonth;
  },
  SET_CALLS_BY_COMPANY_PER_MONTH(state, callsByCompanyPerMonth) {
    state.callsByCompanyPerMonth = callsByCompanyPerMonth;
  },
  SET_GUESTS_BY_COMPANY_PER_MONTH(state, guestsByCompanyPerMonth) {
    state.guestsByCompanyPerMonth = guestsByCompanyPerMonth;
  },
  SET_VOUCHERS_BY_COMPANY_PER_MONTH(state, vouchersByCompanyPerMonth) {
    state.vouchersByCompanyPerMonth = vouchersByCompanyPerMonth;
  },
  SET_ALL_DATA_BY_COMPANY(state, allDataByCompany) {
    state.allDataByCompany = allDataByCompany;
  },
};

export const actions = {
  async getAllStats({commit}) {
    await this.$axios.get('all/stats').then((response) => {
      commit('SET_ALL_STATS', response.data);
    });
  },
  async getAllPerMonth({commit}, payload) {
    await this.$axios.get(`stats/sms/month?month=${payload.month}&year=${payload.year}`).then((response) => {
      commit('SET_ALL_SMS_PER_MONTH', response.data.data);
    });
    await this.$axios.get(`stats/calls/month?month=${payload.month}&year=${payload.year}`).then((response) => {
      commit('SET_ALL_CALLS_PER_MONTH', response.data.data);
    });
    await this.$axios.get(`stats/vouchers/month?month=${payload.month}&year=${payload.year}`).then((response) => {
      commit('SET_ALL_VOUCHERS_PER_MONTH', response.data.data);
    });
  },
  async getAllByCompanyPerMonth({commit}, payload) {
    await this.$axios.get(`company/${payload.company_id}/stats/calls/month?month=${payload.month}&year=${payload.year}`).then((response) => {
      commit('SET_CALLS_BY_COMPANY_PER_MONTH', response.data.data);
    });
    await this.$axios.get(`company/${payload.company_id}/stats/vouchers/month?month=${payload.month}&year=${payload.year}`).then((response) => {
      commit('SET_VOUCHERS_BY_COMPANY_PER_MONTH', response.data.data);
    });
    await this.$axios.get(`company/${payload.company_id}/stats/guests/month?month=${payload.month}&year=${payload.year}`).then((response) => {
      commit('SET_GUESTS_BY_COMPANY_PER_MONTH', response.data.data);
    });
  },
  async getAllDataByCompany({commit}, payload) {
    await this.$axios.get(`company/${payload.company_id}/stats`).then((response) => {
      commit('SET_ALL_DATA_BY_COMPANY', response.data);
    });
  },
};
