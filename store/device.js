export const state = () => ({
  device:{},
  deviceData:{},
  deviceSpots:[],
  sessionsByDevice:[],
  sessionsCurrentPage: null,
  sessionsPerPage: null,
  sessionsTotal:null,
  devicePhones:[]
});

export const getters = {
  device(state) {
    return state.device
  },
  deviceData(state) {
    return state.deviceData
  },
  deviceSpots(state) {
    return state.deviceSpots
  },
  sessionsByDevice(state){
    return state.sessionsByDevice
  },
  sessionsDataCurrentPage(state){
    return state.sessionsCurrentPage
  } ,
  sessionsDataPerPage(state){
    return state.sessionsPerPage
  } ,
  sessionsDataTotal(state){
    return state.sessionsTotal
  },
  devicePhones(state) {
    return state.devicePhones
  },
};

export const mutations = {
  DEVICE(state, device) {
    state.device = device
  },
  DEVICE_DATA(state, deviceData) {
    state.deviceData = deviceData
  },
  DEVICE_SPOTS(state, deviceSpots) {
    state.deviceSpots = deviceSpots
  },
  SET_SESSIONS_BY_DEVICE_CUR_PAGE(state, sessionsCurrentPage) {
    state.sessionsCurrentPage = sessionsCurrentPage
  },
  SET_SESSIONS_BY_DEVICE_PER_PAGE(state, sessionsPerPage) {
    state.sessionsPerPage = sessionsPerPage
  },
  SET_SESSIONS_BY_DEVICE_TOTAL(state, sessionsTotal) {
    state.sessionsTotal = sessionsTotal
  },
  SET_SESSIONS_BY_DEVICE(state, sessionsByDevice) {
    state.sessionsByDevice = sessionsByDevice
  },
  DEVICE_PHONES(state, devicePhones) {
    state.devicePhones = devicePhones
  },
};

export const actions = {
  async getDevice({commit}, device_id) {
    await this.$axios.get(`device/${device_id}`).then((response) => {
      commit('DEVICE', response.data);
    }).catch((err) => {
    });
  },
  async getDeviceData({commit}, device_id) {
    await this.$axios.get(`device/${device_id}/main`).then((response) => {
      commit('DEVICE_DATA', response.data);
    }).catch((err) => {
    });
  },
  async getDeviceSpots({commit}, device_id) {
    await this.$axios.get(`device/${device_id}/spots`).then((response) => {
      commit('DEVICE_SPOTS', response.data);
    }).catch((err) => {
    });
  },
  async getSessionsByDevice({commit}, payload) {
    await this.$axios.get(`device/${payload.device_id}/sessions?session_type=${payload.session_type}&month=${payload.month}&year=${payload.year}&page=${payload.page}`).then((response) => {
      commit('SET_SESSIONS_BY_DEVICE', response.data.data);
      commit('SET_SESSIONS_BY_DEVICE_CUR_PAGE', response.data.meta.current_page);
      commit('SET_SESSIONS_BY_DEVICE_PER_PAGE', response.data.meta.per_page);
      commit('SET_SESSIONS_BY_DEVICE_TOTAL', response.data.meta.total);
    }).catch((err) => {
    });
  },
  async getDevicePhones({commit}, device_id) {
    await this.$axios.get(`device/${device_id}/phones`).then((response) => {
      commit('DEVICE_PHONES', response.data);
    }).catch((err) => {
    });
  },
};
