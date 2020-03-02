export const state = () => ({
  allStats: {},
  allStatsDaysPerMonth: [],
  allSmsPerMonth:[],
  allCallsPerMonth:[],
  allVouchersPerMonth:[],
  allStatsDaysByCompanyPerMonth: [],
  allCallByCompanyPerMonth:[],
  allGuestByCompanyPerMonth:[],
  allVoucherByCompanyPerMonth:[],
  allCallsDataByCompany:[],
  allGuestsDataByCompany:[],
  allDevicesDataByCompany:[]
});

export const getters = {
  //all stats by spots
  stats(state) {
    return state.allStats;
  },

  // all stats by month
  daysInMonth(state) {
    return state.allStatsDaysPerMonth
  },
  allSmsStatsPerMonth(state){
    let data = state.allSmsPerMonth
    let all = []
    let resend = []
    let delivered = []
    if(data===0){
      for(let i = 1; i <= state.allStatsDaysPerMonth; i++){
        all.push(0);
        resend.push(0);
        delivered.push(0);
      }
    }else {
      let map = new Map(Object.entries(data))
      map.forEach(value => {
        all.push(value.all_sms)
        resend.push(value.resend)
        delivered.push(value.delivered)
      })
    }

    return [
      {
        name: "Доставлено",
        data: delivered
      },
      {
        name: "Всего",
        data: all
      },
      {
        name: "Повтор",
        data: resend
      }
    ]
  },
  allCallsStatsPerMonth(state){
    let data = state.allCallsPerMonth
    let requests = []
    let checked = []
    if(data===0){
      for(let i = 1; i <= state.allStatsDaysPerMonth; i++){
        requests.push(0);
        checked.push(0);
      }
    }else {
      let map = new Map(Object.entries(data))
      map.forEach(value => {
        requests.push(value.requests)
        checked.push(value.checked)
      })
    }
    return [
      {
        name: "Запросов",
        data: requests
      },
      {
        name: "Авторизаций",
        data: checked
      },
    ]
  },
  allVouchersStatsPerMonth(state){
    let data = state.allVouchersPerMonth
    let all = []
    let auth = []
    if(data===0){
      for(let i = 1; i <= state.allStatsDaysPerMonth; i++){
        all.push(0);
        auth.push(0);
      }
    }else {
      let map = new Map(Object.entries(data))
      map.forEach(value => {
        all.push(value.all_vouchers)
        auth.push(value.auth)
      })
    }

    return [
      {
        name: "Всего",
        data: all
      },
      {
        name: "Авторизаций",
        data: auth
      },
    ]

  },

  // all stats by month and company
  daysInMonthByCompany(state){
    return state.allStatsDaysByCompanyPerMonth
  },
  allCallsByCompanyPerMonth(state){
    let data = state.allCallByCompanyPerMonth
    let requests = []
    let checked = []
    if(data===0){
      for(let i = 1; i <= state.allStatsDaysByCompanyPerMonth; i++){
        requests.push(0);
        checked.push(0);
      }
    }else {
      let map = new Map(Object.entries(data))
      map.forEach(value => {
        requests.push(value.requests)
        checked.push(value.checked)
      })
    }
    return [
      {
        name: "Запросов",
        data: requests
      },
      {
        name: "Авторизаций",
        data: checked
      },
    ]
  },
  allGuestsByCompanyPerMonth(state){
    let data = state.allGuestByCompanyPerMonth
    let load = []
    let auth = []
    let newOnes = []
    let old = []
    if(data===0){
      for(let i = 1; i <= state.allStatsDaysByCompanyPerMonth; i++){
        load.push(0);
        auth.push(0);
        newOnes.push(0);
        old.push(0);
      }
    }else {
      let map = new Map(Object.entries(data))
      map.forEach(value => {
        load.push(value.load_guests)
        auth.push(value.auth_guests)
        newOnes.push(value.new)
        old.push(value.old)
      })
    }
    return [
      {
        name: "Загрузки",
        data: load
      },
      {
        name: "Авторизаций",
        data: auth
      },
      {
        name: "Новые",
        data: newOnes
      },
      {
        name: "Постоянные",
        data: old
      },
    ]
  },
  allVouchersByCompanyPerMonth(state){
    let data = state.allVoucherByCompanyPerMonth
    let all = []
    let auth = []
    if(data===0){
      for(let i = 1; i <= state.allStatsDaysByCompanyPerMonth; i++){
        all.push(0);
        auth.push(0);
      }
    }else{
      let map = new Map(Object.entries(data))
      map.forEach(value => {
        all.push(value.all)
        auth.push(value.auth)
      })
    }
    return [
      {
        name: "Всего",
        data: all
      },
      {
        name: "Авторизаций",
        data: auth
      }
    ]
  },

  // all stats by company
  allCallsByCompany(state){
    let calls = state.allCallsDataByCompany
    if (Array.isArray(calls)) {
      return []
    } else {
      return [calls.requests, calls.checked]
    }
  },
  allGuestsByCompany(state){
    let guests = state.allGuestsDataByCompany
    if(Array.isArray(guests)){
      return []
    }else {
      return [guests.load, guests.auth, guests.new, guests.old]
    }
  },
  allDevicesByCompany(state){
    let devices = state.allDevicesDataByCompany
    if(Array.isArray(devices)){
      return []
    }else {
      return [devices.mobile, devices.tablet, devices.computer, devices.type_other]
    }
  },
  allBrowsersByCompany(state){
    let devices = state.allDevicesDataByCompany
    if (Array.isArray(devices)) {
      return []
    } else {
      return [devices.android_browser, devices.edge, devices.firefox, devices.chrome, devices.opera, devices.safari, devices.yandex_browser, devices.webkit, devices.browser_other]
    }
  },
  allOsByCompany(state){
    let devices = state.allDevicesDataByCompany
    if(Array.isArray(devices)){
      return []
    }else {
      return [devices.android, devices.linux, devices.ios, devices.windows, devices.windows_phone, devices.os_other]
    }
  },
};

export const mutations = {
  SET_ALL_STATS(state, allStats) {
    state.allStats = allStats;
  },
  SET_ALL_STATS_DAYS_PER_MONTH(state, allStatsDaysPerMonth) {
    state.allStatsDaysPerMonth = allStatsDaysPerMonth;
  },
  SET_ALL_SMS_PER_MONTH(state, allSmsPerMonth) {
    state.allSmsPerMonth = allSmsPerMonth;
  },
  SET_ALL_CALLS_PER_MONTH(state, allCallsPerMonth) {
    state.allCallsPerMonth = allCallsPerMonth;
  },
  SET_ALL_VOUCHERS_PER_MONTH(state, allVouchersPerMonth) {
    state.allVouchersPerMonth = allVouchersPerMonth;
  },
  SET_ALL_STATS_DAYS_BY_COMPANY_PER_MONTH(state, allStatsDaysByCompanyPerMonth) {
    state.allStatsDaysByCompanyPerMonth = allStatsDaysByCompanyPerMonth;
  },
  SET_ALL_CALLS_BY_COMPANY_PER_MONTH(state, allCallByCompanyPerMonth) {
    state.allCallByCompanyPerMonth = allCallByCompanyPerMonth;
  },
  SET_ALL_GUESTS_BY_COMPANY_PER_MONTH(state, allGuestByCompanyPerMonth) {
    state.allGuestByCompanyPerMonth = allGuestByCompanyPerMonth;
  },
  SET_ALL_VOUCHERS_BY_COMPANY_PER_MONTH(state, allVoucherByCompanyPerMonth) {
    state.allVoucherByCompanyPerMonth = allVoucherByCompanyPerMonth;
  },
  SET_CALLS_DATA_BY_COMPANY(state, allCallsDataByCompany) {
    state.allCallsDataByCompany = allCallsDataByCompany;
  },
  SET_GUESTS_DATA_BY_COMPANY(state, allGuestsDataByCompany) {
    state.allGuestsDataByCompany = allGuestsDataByCompany;
  },
  SET_DEVICES_DATA_BY_COMPANY(state, allDevicesDataByCompany) {
    state.allDevicesDataByCompany = allDevicesDataByCompany;
  },

};

export const actions = {
  async getAllStats({commit}) {
    await this.$axios.get('all/stats').then((response) => {
      commit('SET_ALL_STATS', response.data);
    });
  },
  async getAllPerMonth({commit}, payload) {
    await this.$axios.get(`all/stats/month?month=${payload.month}&year=${payload.year}`).then((response) => {
      commit('SET_ALL_STATS_DAYS_PER_MONTH', response.data.days);
      commit('SET_ALL_SMS_PER_MONTH', response.data.sms);
      commit('SET_ALL_CALLS_PER_MONTH', response.data.calls);
      commit('SET_ALL_VOUCHERS_PER_MONTH', response.data.vouchers);
    });
  },
  async getAllByCompanyPerMonth({commit}, payload) {
    await this.$axios.get(`company/${payload.company_id}/stats/month?month=${payload.month}&year=${payload.year}`).then((response) => {
      commit('SET_ALL_STATS_DAYS_BY_COMPANY_PER_MONTH', response.data.days);
      commit('SET_ALL_CALLS_BY_COMPANY_PER_MONTH', response.data.calls);
      commit('SET_ALL_GUESTS_BY_COMPANY_PER_MONTH', response.data.guests);
      commit('SET_ALL_VOUCHERS_BY_COMPANY_PER_MONTH', response.data.vouchers);
    });
  },
  async getAllDataByCompany({commit}, payload) {
    await this.$axios.get(`company/${payload.company_id}/stats`).then((response) => {
      commit('SET_CALLS_DATA_BY_COMPANY', response.data.call);
      commit('SET_GUESTS_DATA_BY_COMPANY', response.data.guest);
      commit('SET_DEVICES_DATA_BY_COMPANY', response.data.device);
    });
  },
};
