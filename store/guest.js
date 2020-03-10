export const state = () => ({
  guestsBySpot: [],
  guestsByCompany: [],
  guestsCurrentPage: null,
  guestsPerPage: null,
  guestsTotal:null
});

export const getters = {
  guestsByCompany(state) {
    return state.guestsByCompany
  },
  guestsBySpot(state) {
    return state.guestsBySpot
  },
  guestsCurrentPage(state){
    return state.guestsCurrentPage
  } ,
  guestsPerPage(state){
    return state.guestsPerPage
  } ,
  guestsTotal(state){
    return state.guestsTotal
  }
};

export const mutations = {
  SET_GUESTS_BY_SPOT(state, guestsBySpot) {
    state.guestsBySpot = guestsBySpot
  },
  SET_GUESTS_BY_COMPANY(state, guestsByCompany) {
    state.guestsByCompany = guestsByCompany
  },
  GUESTS_CUR_PAGE(state, guestsCurrentPage) {
    state.guestsCurrentPage = guestsCurrentPage
  },
  GUESTS_PER_PAGE(state, guestsPerPage) {
    state.guestsPerPage = guestsPerPage
  },
  GUESTS_TOTAL(state, guestsTotal) {
    state.guestsTotal = guestsTotal
  },
};

export const actions = {
  async getGuestsByCompany({commit}, payload) {
    await this.$axios.get(`company/${payload.company_id}/guests?month=${payload.month}&year=${payload.year}&page=${payload.page}`).then((response) => {
      commit('SET_GUESTS_BY_COMPANY', response.data.data);
      commit('GUESTS_CUR_PAGE', response.data.meta.current_page);
      commit('GUESTS_PER_PAGE', response.data.meta.per_page);
      commit('GUESTS_TOTAL', response.data.meta.total);
    }).catch((err) => {
    });
  },
  async getGuestsBySpot({commit}, payload) {
    await this.$axios.get(`guest/${payload.spot_id}/spot?month=${payload.month}&year=${payload.year}&page=${payload.page}`).then((response) => {
      commit('SET_GUESTS_BY_SPOT', response.data.data);
      commit('GUESTS_CUR_PAGE', response.data.meta.current_page);
      commit('GUESTS_PER_PAGE', response.data.meta.per_page);
      commit('GUESTS_TOTAL', response.data.meta.total);
    }).catch((err) => {
    });
  },
};
