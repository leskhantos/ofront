export const state = () => ({
  guestsByCompany:[],
  guestsBySpot:[]
});

export const getters = {
  guestsByCompany(state) {
    return state.guestsByCompany
  },
  guestsBySpot(state) {
    return state.guestsBySpot
  }
};

export const mutations = {
  SET_GUESTS_BY_SPOT(state, guestsBySpot) {
    state.guestsBySpot = guestsBySpot
  },
  SET_GUESTS_BY_COMPANY(state, guestsByCompany) {
    state.guestsByCompany = guestsByCompany
  }
};

export const actions = {
  async getGuestsByCompany({commit}, payload) {
    await this.$axios.get(`company/${payload.company_id}/guests?month=${payload.month}&year=${payload.year}`).then((response) => {
      commit('SET_GUESTS_BY_COMPANY', response.data);
    }).catch((err) => {
    });
  },
  async getGuestsBySpot({commit}, payload) {
    await this.$axios.get(`guest/${payload.spot_id}/spot?month=${payload.month}&year=${payload.year}`).then((response) => {
      commit('SET_GUESTS_BY_SPOT', response.data);
    }).catch((err) => {
    });
  },
};
