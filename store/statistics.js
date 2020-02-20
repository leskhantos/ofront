export const state= ()=>({
  stats: {},

});

export const getters = {
  stats(state){
    return state.stats;
  },
};

export const mutations = {
  SET_ALL_STATS(state,stats){
    state.stats = stats;
  },
};

export const actions = {
  async getStats({commit}){
    await this.$axios.get('all/stats').then((response)=>{
      commit('SET_ALL_STATS',response.data);
    });
  },
};
