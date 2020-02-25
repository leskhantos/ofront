export const state= ()=>({
  stats: {},
  smsPerMonth: []
});

export const getters = {
  stats(state){
    return state.stats;
  },
  smsPerMonth(state){
    return state.smsPerMonth;
  },
};

export const mutations = {
  SET_ALL_STATS(state,stats){
    state.stats = stats;
  },
  SET_ALL_SMS_PER_MONTH(state,smsPerMonth){
    state.smsPerMonth = smsPerMonth;
  },
};

export const actions = {
  async getStats({commit}){
    await this.$axios.get('all/stats').then((response)=>{
      commit('SET_ALL_STATS',response.data);
    });
  },
  async getSmsPerMonth({commit},payload){
    await this.$axios.get(`sms/stats?month=${payload.month}&year=${payload.year}`).then((response)=>{
      commit('SET_ALL_SMS_PER_MONTH',response.data);
    });
  },
};
