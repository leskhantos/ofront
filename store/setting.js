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
    try {
      const response = await this.$axios.get('settings')
      commit('SET_SETTINGS', response.data[0]);
    }catch(err) {
    }
  },
  async setSettings({commit},payload) {
    try{
      await this.$axios.post('settings',payload)
    } catch (err) {
      console.log(error)
    }
  },
  async updateSettings({commit},payload) {
    try{
      await this.$axios.put(`settings/${payload.id}`,payload)
    } catch (err) {
      console.log(error)
    }
  }
};
