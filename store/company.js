export const state = () => ({
  companies: [],
  company: [],
  auth_types: [],
  spots: [],
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
  auth_types(state) {
    return state.auth_types
  },
  spots(state) {
    return state.spots
  },
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
  SET_AUTH_TYPES(state, auth_types) {
    state.auth_types = auth_types;
  },
  SET_SPOTS_LIST(state, spots) {
    state.spots = spots
  },
  SET_STYLES_LIST(state, styles) {
    state.styles = styles
  },
  SET_ACCOUNTS_LIST(state, accounts) {
    state.accounts = accounts
  }
};

export const actions = {
  async getCompanies({commit}) {
    await this.$axios.get('companies').then((response) => {
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
    }).catch((err) => {

    });
  },
  async getCompany({commit}, company_id) {
    await this.$axios.get(`company/${company_id}`).then((response) => {
      commit('SET_COMPANY', response.data);
    }).catch((err) => {
    });
  },
  async getAuthTypes({commit}) {
    await this.$axios.get('spot/auth/types').then((response) => {
      commit('SET_AUTH_TYPES', response.data);
    }).catch((err) => {
    });
  },
  async getSpots({commit}, company_id) {
    await this.$axios.get(`company/${company_id}/spots`).then((response) => {
      commit('SET_SPOTS_LIST', response.data);
    }).catch((err) => {

    });
  },
  async getStyles({commit}, company_id) {
    await this.$axios.get(`company/${company_id}/pages`).then((response) => {
      commit('SET_STYLES_LIST', response.data);
    }).catch((err) => {

    });
  },
  async getAccounts({commit}, company_id) {
    await this.$axios.get(`company/${company_id}/accounts`).then((response) => {
      commit('SET_ACCOUNTS_LIST', response.data);
    }).catch((err) => {
    });
  }
};
