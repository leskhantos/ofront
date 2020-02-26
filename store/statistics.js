export const state= ()=>({
  stats: {},
  smsPerMonth: [],
  callsPerMonth:[],
  callsByCompanyPerMonth:[],
  guestsByCompanyPerMonth:[]
});

export const getters = {
  stats(state){
    return state.stats;
  },
  smsPerMonth(state){
    return state.smsPerMonth;
  },
  callsPerMonth(state){
    return state.callsPerMonth;
  },
  callsByCompanyPerMonth(state){
    return state.callsByCompanyPerMonth;
  },
  guestsByCompanyPerMonth(state){
    return state.guestsByCompanyPerMonth;
  },
};

export const mutations = {
  SET_ALL_STATS(state,stats){
    state.stats = stats;
  },
  SET_ALL_SMS_PER_MONTH(state,smsPerMonth){
    state.smsPerMonth = smsPerMonth;
  },
  SET_ALL_CALLS_PER_MONTH(state,callsPerMonth){
    state.callsPerMonth = callsPerMonth;
  },
  SET_CALLS_BY_COMPANY_PER_MONTH(state,callsByCompanyPerMonth){
    state.callsByCompanyPerMonth = callsByCompanyPerMonth;
  },
  SET_GUESTS_BY_COMPANY_PER_MONTH(state,guestsByCompanyPerMonth){
    state.guestsByCompanyPerMonth = guestsByCompanyPerMonth;
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
      commit('SET_ALL_SMS_PER_MONTH',response.data.data);
    });
  },
  async getCallsPerMonth({commit},payload){
    await this.$axios.get(`calls/stats?month=${payload.month}&year=${payload.year}`).then((response)=>{
      commit('SET_ALL_CALLS_PER_MONTH',response.data.data);
    });
  },
  async getCallsByMonthPerMonth({commit},payload){
    await this.$axios.get(`company/${payload.company_id}/calls?month=${payload.month}&year=${payload.year}`).then((response)=>{
      commit('SET_CALLS_BY_COMPANY_PER_MONTH',response.data.data);
    });
  },
  async getGuestsByMonthPerMonth({commit},payload){
    await this.$axios.get(`company/${payload.company_id}/stats/guest?month=${payload.month}&year=${payload.year}`).then((response)=>{
      commit('SET_GUESTS_BY_COMPANY_PER_MONTH',response.data.data);
    });
  },
};
