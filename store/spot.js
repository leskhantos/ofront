export const state = () => ({
  spot: {},
  spotTypesByCompany: [],
  spotsByCompany: [],
  sessionsBySpot:[],
  sessionsDataCurrentPage: null,
  sessionsDataPerPage: null,
  sessionsDataTotal:null,
  callsBySpot:[],
  callsBySpotCurrentPage: null,
  callsBySpotPerPage: null,
  callsBySpotTotal:null,
  smsBySpot:[],
  smsBySpotCurrentPage: null,
  smsBySpotPerPage: null,
  smsBySpotTotal:null,
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
  },
  spotTypes(){
    return [
      {id:1, name:'SMS'},
      {id:2, name:'Звонки'},
      {id:3, name:'Ваучеры'}
    ]
  },
  sessionTypes(){
    return [
      {id:1, name:'Активные'},
      {id:2, name:'Авторизации'},
      {id:3, name:'Завершенные'}
    ]
  },
  sessionsBySpotData(state){
    return state.sessionsBySpot
  },
  sessionsDataCurrentPage(state){
    return state.sessionsDataCurrentPage
  } ,
  sessionsDataPerPage(state){
    return state.sessionsDataPerPage
  } ,
  sessionsDataTotal(state){
    return state.sessionsDataTotal
  },
  callsBySpot(state){
    return state.callsBySpot
  } ,
  callsBySpotCurrentPage(state){
    return state.callsBySpotCurrentPage
  } ,
  callsBySpotPerPage(state){
    return state.callsBySpotPerPage
  } ,
  callsBySpotTotal(state){
    return state.callsBySpotTotal
  },
  smsBySpot(state){
    return state.smsBySpot
  },
  smsBySpotCurrentPage(state){
    return state.smsBySpotCurrentPage
  } ,
  smsBySpotPerPage(state){
    return state.smsBySpotPerPage
  } ,
  smsBySpotTotal(state){
    return state.smsBySpotTotal
  },
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
  },
  SET_SESSIONS_BY_SPOT_CUR_PAGE(state, sessionsDataCurrentPage) {
    state.sessionsDataCurrentPage = sessionsDataCurrentPage
  },
  SET_SESSIONS_BY_SPOT_PER_PAGE(state, sessionsDataPerPage) {
    state.sessionsDataPerPage = sessionsDataPerPage
  },
  SET_SESSIONS_BY_SPOT_TOTAL(state, sessionsDataTotal) {
    state.sessionsDataTotal = sessionsDataTotal
  },
  SET_SESSIONS_BY_SPOT(state, sessionsBySpot) {
    state.sessionsBySpot = sessionsBySpot
  } ,
  SET_CALLS_BY_SPOT(state, callsBySpot) {
    state.callsBySpot = callsBySpot
  },
  SET_CALLS_BY_SPOT_CUR_PAGE(state, callsBySpotCurrentPage) {
    state.callsBySpotCurrentPage = callsBySpotCurrentPage
  },
  SET_CALLS_BY_SPOT_PER_PAGE(state, callsBySpotPerPage) {
    state.callsBySpotPerPage = callsBySpotPerPage
  },
  SET_CALLS_BY_SPOT_TOTAL(state, callsBySpotTotal) {
    state.callsBySpotTotal = callsBySpotTotal
  },
  SET_SMS_BY_SPOT(state, smsBySpot) {
    state.smsBySpot = smsBySpot
  },
  SET_SMS_BY_SPOT_CUR_PAGE(state, smsBySpotCurrentPage) {
    state.smsBySpotCurrentPage = smsBySpotCurrentPage
  },
  SET_SMS_BY_SPOT_PER_PAGE(state, smsBySpotPerPage) {
    state.smsBySpotPerPage = smsBySpotPerPage
  },
  SET_SMS_BY_SPOT_TOTAL(state, smsBySpotTotal) {
    state.smsBySpotTotal = smsBySpotTotal
  },
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
  async getSessionsBySpot({commit}, payload) {
    await this.$axios.get(`spot/${payload.spot_id}/session?session_type=${payload.session_type}&month=${payload.month}&year=${payload.year}&device_mac=${payload.device_mac}&page=${payload.page}`).then((response) => {
      commit('SET_SESSIONS_BY_SPOT', response.data.data);
      commit('SET_SESSIONS_BY_SPOT_CUR_PAGE', response.data.meta.current_page);
      commit('SET_SESSIONS_BY_SPOT_PER_PAGE', response.data.meta.per_page);
      commit('SET_SESSIONS_BY_SPOT_TOTAL', response.data.meta.total);
    }).catch((err) => {
    });
  },
  async getCallsBySpot({commit}, payload) {
    await this.$axios.get(`spot/${payload.spot_id}/call?&month=${payload.month}&year=${payload.year}&search=${payload.query}&page=${payload.page}`).then((response) => {
      commit('SET_CALLS_BY_SPOT', response.data.data);
      commit('SET_CALLS_BY_SPOT_CUR_PAGE', response.data.meta.current_page);
      commit('SET_CALLS_BY_SPOT_PER_PAGE', response.data.meta.per_page);
      commit('SET_CALLS_BY_SPOT_TOTAL', response.data.meta.total);
    }).catch((err) => {
    });
  },
  async getSmsBySpot({commit}, payload) {
    await this.$axios.get(`spot/${payload.spot_id}/sms?&month=${payload.month}&year=${payload.year}&search=${payload.query}&page=${payload.page}`).then((response) => {
      commit('SET_SMS_BY_SPOT', response.data.data);
      commit('SET_SMS_BY_SPOT_CUR_PAGE', response.data.meta.current_page);
      commit('SET_SMS_BY_SPOT_PER_PAGE', response.data.meta.per_page);
      commit('SET_SMS_BY_SPOT_TOTAL', response.data.meta.total);
    }).catch((err) => {
    });
  },
};
