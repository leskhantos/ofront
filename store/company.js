export const state = () => ({
  companies: [],
  company: [],
  // spots: [],
  styles: [],
  accounts: []
});

export const getters = {
  companies(state) {
    return state.companies;
  },
  company(state) {
    return state.company;
  },
  // spots(state) {
  //  return state.spots
  // },
  styles(state) {
    return state.styles
  },
  accounts(state) {
    return state.accounts
  }
};

export const mutations = {
  SET_COMPANIES_LIST(state, companies) {
    state.companies = companies;
  },
  SET_COMPANY(state, company) {
    state.company = company;
  },
  // SET_SPOTS_LIST(state, spots) {
  //   state.spots = spots
  // },
  SET_STYLES_LIST(state, styles) {
    state.styles = styles
  },
  SET_ACCOUNTS_LIST(state, accounts) {
    state.accounts = accounts
  }
};

export const actions = {
  async getCompanies({commit}) {
   const response = await this.$axios.get('companies')
      let arr = response.data
        arr = arr.sort(function(a, b){
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();
        if (nameA > nameB) {
          return 1;
        }
        if (nameA < nameB) {
          return -1;
        }
        return 0;
      });
      commit('SET_COMPANIES_LIST', arr);
  },
  async getCompany({commit}, company_id) {
   const response = await this.$axios.get(`company/${company_id}`)
      commit('SET_COMPANY', response.data);
  },
  // async getSpots({commit}, company_id) {
  //  const response = await this.$axios.get(`company/${company_id}/spots`)
  //     commit('SET_SPOTS_LIST', response.data);
  // },
  async getStyles({commit}, company_id) {
   const response = await this.$axios.get(`company/${company_id}/pages`)
      commit('SET_STYLES_LIST', response.data);
  },
  async getAccounts({commit}, company_id) {
   const response = await this.$axios.get(`company/${company_id}/accounts`)
      commit('SET_ACCOUNTS_LIST', response.data);
  }
};
