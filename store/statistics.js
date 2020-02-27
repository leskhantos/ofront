export const state= ()=>({
  stats: {},
  calls:{},
  sms:{},
  vouchers:{},
  smsPerMonth: [],
  callsPerMonth:[],
  vouchersPerMonth:[],
  callsByCompanyPerMonth:[],
  guestsByCompanyPerMonth:[],
  vouchersByCompanyPerMonth:[]
});

export const getters = {
  stats(state){
    return state.stats;
  },
  calls(state){
    return state.calls;
  },
  sms(state){
    return state.sms;
  },
  vouchers(state){
    return state.vouchers;
  },
  smsPerMonth(state){
    return state.smsPerMonth;
  },
  callsPerMonth(state){
    return state.callsPerMonth;
  },
  vouchersPerMonth(state){
    return state.vouchersPerMonth;
  },
  callsByCompanyPerMonth(state){
    return state.callsByCompanyPerMonth;
  },
  guestsByCompanyPerMonth(state){
    return state.guestsByCompanyPerMonth;
  },
  vouchersByCompanyPerMonth(state){
    return state.vouchersByCompanyPerMonth;
  },
};

export const mutations = {
  SET_ALL_STATS(state,stats){
    state.stats = stats;
  },
  SET_ALL_CALLS(state,calls){
    state.calls = calls;
  },
  SET_ALL_SMS(state,sms){
    state.sms = sms;
  },
  SET_ALL_VOUCHERS(state,vouchers){
    state.vouchers = vouchers;
  },
  SET_ALL_SMS_PER_MONTH(state,smsPerMonth){
    state.smsPerMonth = smsPerMonth;
  },
  SET_ALL_CALLS_PER_MONTH(state,callsPerMonth){
    state.callsPerMonth = callsPerMonth;
  },
  SET_ALL_VOUCHERS_PER_MONTH(state,vouchersPerMonth){
    state.vouchersPerMonth = vouchersPerMonth;
  },
  SET_CALLS_BY_COMPANY_PER_MONTH(state,callsByCompanyPerMonth){
    state.callsByCompanyPerMonth = callsByCompanyPerMonth;
  },
  SET_GUESTS_BY_COMPANY_PER_MONTH(state,guestsByCompanyPerMonth){
    state.guestsByCompanyPerMonth = guestsByCompanyPerMonth;
  },
  SET_VOUCHERS_BY_COMPANY_PER_MONTH(state,vouchersByCompanyPerMonth){
    state.vouchersByCompanyPerMonth = vouchersByCompanyPerMonth;
  },
};

export const actions = {
  async getStats({commit}){
    await this.$axios.get('all/stats').then((response)=>{
      commit('SET_ALL_STATS',response.data);
    });
  },
  async getCalls({commit}){
    await this.$axios.get('stats/calls').then((response)=>{
      commit('SET_ALL_CALLS',response.data);
    });
  },
  async getSms({commit}){
    await this.$axios.get('stats/sms').then((response)=>{
      commit('SET_ALL_SMS',response.data);
    });
  },
  async getVouchers({commit}){
    await this.$axios.get('stats/vouchers').then((response)=>{
      commit('SET_ALL_VOUCHERS',response.data);
    });
  },
  async getSmsPerMonth({commit},payload){
    await this.$axios.get(`stats/sms/month?month=${payload.month}&year=${payload.year}`).then((response)=>{
      commit('SET_ALL_SMS_PER_MONTH',response.data.data);
    });
  },
  async getCallsPerMonth({commit},payload){
    await this.$axios.get(`stats/calls/month?month=${payload.month}&year=${payload.year}`).then((response)=>{
      commit('SET_ALL_CALLS_PER_MONTH',response.data.data);
    });
  },
  async getVouchersPerMonth({commit},payload){
    await this.$axios.get(`stats/vouchers/month?month=${payload.month}&year=${payload.year}`).then((response)=>{
      commit('SET_ALL_VOUCHERS_PER_MONTH',response.data.data);
    });
  },
  async getCallsByCompanyPerMonth({commit},payload){
    await this.$axios.get(`company/${payload.company_id}/stats/calls?month=${payload.month}&year=${payload.year}`).then((response)=>{
      commit('SET_CALLS_BY_COMPANY_PER_MONTH',response.data.data);
    });
  },
  async getGuestsByCompanyPerMonth({commit},payload){
    await this.$axios.get(`company/${payload.company_id}/stats/guests?month=${payload.month}&year=${payload.year}`).then((response)=>{
      commit('SET_GUESTS_BY_COMPANY_PER_MONTH',response.data.data);
    });
  },
  async getVouchersByCompanyPerMonth({commit},payload){
    await this.$axios.get(`company/${payload.company_id}/stats/vouchers?month=${payload.month}&year=${payload.year}`).then((response)=>{
      commit('SET_VOUCHERS_BY_COMPANY_PER_MONTH',response.data.data);
    });
  },
};
