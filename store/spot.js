export const state = () => ({
  spot: {},
  spotTypesByCompany: [],
  spotsByCompany: [],
  sessionsBySpot:[],
  sessionsDataCurrentPage: null,
  sessionsDataPerPage: null,
  sessionsDataTotal:null
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
  sessionTypes(){
    return [
      {id:1, name:'Активные'},
      {id:2, name:'Авторизации'},
      {id:3, name:'Завершенные'}
    ]
  },
  sessionsBySpotData(state){
    return state.sessionsBySpot.data
  },
  sessionsDataCurrentPage(state){
    return state.sessionsDataCurrentPage
  } ,
  sessionsDataPerPage(state){
    return state.sessionsDataPerPage
  } ,
  sessionsDataTotal(state){
    return state.sessionsDataTotal
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
    async getSessionsBySpot({commit}, payload) {
    if(payload.session_type==3){
      await this.$axios.get(`spot/${payload.spot_id}/session?session_type=${payload.session_type}&month=${payload.month}&year=${payload.year}&device_mac=${payload.device_mac}&page=${payload.page}`).then((response) => {
        commit('SET_SESSIONS_BY_SPOT', response.data);
        commit('SET_SESSIONS_BY_SPOT_CUR_PAGE', response.data.meta.current_page);
        commit('SET_SESSIONS_BY_SPOT_PER_PAGE', response.data.meta.per_page);
        commit('SET_SESSIONS_BY_SPOT_TOTAL', response.data.meta.total);
      }).catch((err) => {
      });
    }else{
      await this.$axios.get(`spot/${payload.spot_id}/session?session_type=${payload.session_type}&device_mac=${payload.device_mac}&page=${payload.page}`).then((response) => {
        commit('SET_SESSIONS_BY_SPOT', response.data);
        commit('SET_SESSIONS_BY_SPOT_CUR_PAGE', response.data.meta.current_page);
        commit('SET_SESSIONS_BY_SPOT_PER_PAGE', response.data.meta.per_page);
        commit('SET_SESSIONS_BY_SPOT_TOTAL', response.data.meta.total);
      }).catch((err) => {
      });
    }

  },

};
