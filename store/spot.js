export const state = () => ({
  spot: {}
});

export const getters = {
  spot(state) {
    return state.spot
  }
};

export const mutations = {
  SET_SPOT(state, spot) {
    state.spot = spot
  }
};

export const actions = {
  async getSpot({commit}, spot_id) {
    await this.$axios.get(`spot/${spot_id}`).then((response) => {
      commit('SET_SPOT', response.data);
    }).catch((err) => {
    });
  },
};
