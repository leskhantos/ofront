export const state = () => ({
  stats: {},
  allStatsPerMonth: [],
  callsByCompanyPerMonth: [],
  guestsByCompanyPerMonth: [],
  vouchersByCompanyPerMonth: [],
  allDataByCompany: {}
});

export const getters = {
  stats(state) {
    return state.stats;
  },
  allStatsPerMonth(state) {
    return state.allStatsPerMonth;
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
  SET_ALL_STATS_PER_MONTH(state, allStatsPerMonth) {
    state.allStatsPerMonth = allStatsPerMonth;
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
    await this.$axios.get(`all/stats/month?month=${payload.month}&year=${payload.year}`).then((response) => {
      commit('SET_ALL_STATS_PER_MONTH', response.data.data);
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
