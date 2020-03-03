export const state = () => ({
  //all stats
  allStats: {},

  // all stats by month
  allStatsDaysPerMonth: [],
  allSmsPerMonth:[],
  allCallsPerMonth:[],
  allVouchersPerMonth:[],

  // all stats by month and company
  allStatsDaysByCompanyPerMonth: [],
  allCallByCompanyPerMonth:[],
  allGuestByCompanyPerMonth:[],
  allVoucherByCompanyPerMonth:[],

  // all stats by company
  allCallsDataByCompany:[],
  allGuestsDataByCompany:[],
  allDevicesDataByCompany:[],

  //all stats by month and spot
  allStatsDaysBySpotPerMonth:[],
  allCallBySpotPerMonth:[],
  allGuestBySpotPerMonth:[],
  allVoucherBySpotPerMonth:[],

  //all stats by spot
  allCallsDataBySpot:[],
  allGuestsDataBySpot:[],
  allDevicesDataBySpot:[],
});

export const getters = {
  //all stats
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

  // all stats by month and spot
  daysInMonthBySpot(state){
    return state.allStatsDaysBySpotPerMonth
  },
  allCallsBySpotPerMonth(state){
    let data = state.allCallBySpotPerMonth
    let requests = []
    let checked = []
    if(data===0){
      for(let i = 1; i <= state.allStatsDaysBySpotPerMonth; i++){
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
  allGuestsBySpotPerMonth(state){
    let data = state.allGuestBySpotPerMonth
    let load = []
    let auth = []
    let newOnes = []
    let old = []
    if(data===0){
      for(let i = 1; i <= state.allStatsDaysBySpotPerMonth; i++){
        load.push(0);
        auth.push(0);
        newOnes.push(0);
        old.push(0);
      }
    }else {
      let map = new Map(Object.entries(data))
      map.forEach(value => {
        load.push(value.load)
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
  allVouchersBySpotPerMonth(state){
    let data = state.allVoucherBySpotPerMonth
    let all = []
    let auth = []
    if(data===0){
      for(let i = 1; i <= state.allStatsDaysBySpotPerMonth; i++){
        all.push(0);
        auth.push(0);
      }
    }else{
      let map = new Map(Object.entries(data))
      map.forEach(value => {
        all.push(value.all)
        auth.push(value.auth_vouchers)
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

  //all stats by spot
  allCallsBySpot(state){
    let calls = state.allCallsDataBySpot
    if (Array.isArray(calls)) {
      return []
    } else {
      return [calls.requests, calls.checked]
    }
  },
  allGuestsBySpot(state){
    let guests = state.allGuestsDataBySpot
    if(Array.isArray(guests)){
      return []
    }else {
      return [guests.load, guests.auth, guests.new, guests.old]
    }
  },
  allDevicesBySpot(state){
    let devices = state.allDevicesDataBySpot
    if(Array.isArray(devices)){
      return []
    }else {
      return [devices.mobile, devices.tablet, devices.computer, devices.type_other]
    }
  },
  allBrowsersBySpot(state){
    let devices = state.allDevicesDataBySpot
    if (Array.isArray(devices)) {
      return []
    } else {
      return [devices.android_browser, devices.edge, devices.firefox, devices.chrome, devices.opera, devices.safari, devices.yandex_browser, devices.webkit, devices.browser_other]
    }
  },
  allOsBySpot(state){
    let devices = state.allDevicesDataBySpot
    if(Array.isArray(devices)){
      return []
    }else {
      return [devices.android, devices.linux, devices.ios, devices.windows, devices.windows_phone, devices.os_other]
    }
  },
};

export const mutations = {
  //all stats

  SET_ALL_STATS(state, allStats) {
    state.allStats = allStats;
  },

  // all stats by month
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

  // all stats by month and company
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

  // all stats by company
  SET_CALLS_DATA_BY_COMPANY(state, allCallsDataByCompany) {
    state.allCallsDataByCompany = allCallsDataByCompany;
  },
  SET_GUESTS_DATA_BY_COMPANY(state, allGuestsDataByCompany) {
    state.allGuestsDataByCompany = allGuestsDataByCompany;
  },
  SET_DEVICES_DATA_BY_COMPANY(state, allDevicesDataByCompany) {
    state.allDevicesDataByCompany = allDevicesDataByCompany;
  },

  // all stats by month and spot
  SET_ALL_STATS_DAYS_BY_SPOT_PER_MONTH(state, allStatsDaysBySpotPerMonth) {
    state.allStatsDaysBySpotPerMonth = allStatsDaysBySpotPerMonth;
  },
  SET_ALL_CALLS_BY_SPOT_PER_MONTH(state, allCallBySpotPerMonth) {
    state.allCallBySpotPerMonth = allCallBySpotPerMonth;
  },
  SET_ALL_GUESTS_BY_SPOT_PER_MONTH(state, allGuestBySpotPerMonth) {
    state.allGuestBySpotPerMonth = allGuestBySpotPerMonth;
  },
  SET_ALL_VOUCHERS_BY_SPOT_PER_MONTH(state, allVoucherBySpotPerMonth) {
    state.allVoucherBySpotPerMonth = allVoucherBySpotPerMonth;
  },

  //all stats by spot
  SET_CALLS_DATA_BY_SPOT(state, allCallsDataBySpot) {
    state.allCallsDataBySpot = allCallsDataBySpot;
  },
  SET_GUESTS_DATA_BY_SPOT(state, allGuestsDataBySpot) {
    state.allGuestsDataBySpot = allGuestsDataBySpot;
  },
  SET_DEVICES_DATA_BY_SPOT(state, allDevicesDataBySpot) {
    state.allDevicesDataBySpot = allDevicesDataBySpot;
  },
};

export const actions = {
  //all statistics
  async getAllStats({commit}) {
    await this.$axios.get('all/stats').then((response) => {
      commit('SET_ALL_STATS', response.data);
    });
  },

  //all stats per month
  async getAllPerMonth({commit}, payload) {
    await this.$axios.get(`all/stats/month?month=${payload.month}&year=${payload.year}`).then((response) => {
      commit('SET_ALL_STATS_DAYS_PER_MONTH', response.data.days);
      commit('SET_ALL_SMS_PER_MONTH', response.data.sms);
      commit('SET_ALL_CALLS_PER_MONTH', response.data.calls);
      commit('SET_ALL_VOUCHERS_PER_MONTH', response.data.vouchers);
    });
  },


  //statistics by company per month
  async getAllByCompanyPerMonth({commit}, payload) {
    await this.$axios.get(`company/${payload.company_id}/stats/month?month=${payload.month}&year=${payload.year}`).then((response) => {
      commit('SET_ALL_STATS_DAYS_BY_COMPANY_PER_MONTH', response.data.days);
      commit('SET_ALL_CALLS_BY_COMPANY_PER_MONTH', response.data.calls);
      commit('SET_ALL_GUESTS_BY_COMPANY_PER_MONTH', response.data.guests);
      commit('SET_ALL_VOUCHERS_BY_COMPANY_PER_MONTH', response.data.vouchers);
    });
  },
  //all statistics by company
  async getAllDataByCompany({commit}, payload) {
    await this.$axios.get(`company/${payload.company_id}/stats`).then((response) => {
      commit('SET_CALLS_DATA_BY_COMPANY', response.data.call);
      commit('SET_GUESTS_DATA_BY_COMPANY', response.data.guest);
      commit('SET_DEVICES_DATA_BY_COMPANY', response.data.device);
    });
  },


  //statistics by company per month
  async getAllBySpotPerMonth({commit}, payload) {
    await this.$axios.get(`spot/${payload.spot_id}/stats/month?month=${payload.month}&year=${payload.year}`).then((response) => {
      commit('SET_ALL_STATS_DAYS_BY_SPOT_PER_MONTH', response.data.days);
      commit('SET_ALL_CALLS_BY_SPOT_PER_MONTH', response.data.calls);
      commit('SET_ALL_GUESTS_BY_SPOT_PER_MONTH', response.data.guests);
      commit('SET_ALL_VOUCHERS_BY_SPOT_PER_MONTH', response.data.vouchers);
    });
  },

  //all statistics by spot
  async getAllDataBySpot({commit}, payload) {
    await this.$axios.get(`spot/${payload.spot_id}/stats`).then((response) => {
      commit('SET_CALLS_DATA_BY_SPOT', response.data.call);
      commit('SET_GUESTS_DATA_BY_SPOT', response.data.guest);
      commit('SET_DEVICES_DATA_BY_SPOT', response.data.device);
    });
  },
};
