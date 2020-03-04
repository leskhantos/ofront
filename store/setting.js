export const state = () => ({
  settings: {}
});

export const getters = {
  settings(state) {
    return state.settings
  }
};

export const mutations = {
  SET_SETTINGS(state, settings) {
    state.settings = settings
  }
};

export const actions = {
  async getSettings({commit}) {
    await this.$axios.get('settings').then((response) => {
      commit('SET_SETTINGS', response.data[0]);
    }).catch((err) => {
    });
  }
};
