export const state = () => ({
  spot: {},
  spotTypesByCompany:[],
  spotsByCompany:[]
});

export const getters = {
  spot(state) {
    return state.spot
  },
  spotTypesByCompany(state) {
    return state.spotTypesByCompany
  },
  spotsByCompany(state) {
    return state.spotsByCompany
  }
};

export const mutations = {
  SET_SPOT(state, spot) {
    state.spot = spot
  },
  SET_TYPES_BY_COMPANY_SPOT(state, spotTypesByCompany) {
    state.spotTypesByCompany = spotTypesByCompany
  },
  SET_SPOTS_BY_COMPANY(state, spotsByCompany) {
    state.spotsByCompany = spotsByCompany
  }
};

export const actions = {
  async getSpot({commit}, spot_id) {
    await this.$axios.get(`spot/${spot_id}`).then((response) => {
      commit('SET_SPOT', response.data);
    }).catch((err) => {
    });
  },
  async getSpotTypesByCompany({commit}, company_id) {
    await this.$axios.get(`spots/types/${company_id}/company`).then((response) => {
      commit('SET_TYPES_BY_COMPANY_SPOT', response.data);
    }).catch((err) => {
    });
  },
  async getSpotsByCompany({commit}, company_id) {
    await this.$axios.get(`company/${company_id}/spots`).then((response) => {
      commit('SET_SPOTS_BY_COMPANY', response.data);
    }).catch((err) => {
    });
  },
};
