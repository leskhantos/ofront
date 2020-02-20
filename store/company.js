export const state= ()=>({
  companies:[],
  company:[],
  auth_types:[],
  spots:[]
});

export const getters = {
  companies(state){
    return state.companies;
  },
  company(state){
    return state.company;
  },
  auth_types(state){
    return state.auth_types
  },
  spots(state){
    return state.spots
  }
};

export const mutations = {
  SET_COMPANIES_LIST(state,companies){
    state.companies = companies;
  },
  SET_COMPANY(state,company){
    state.company = company;
  },
  SET_AUTH_TYPES(state,auth_types){
    state.auth_types = auth_types;
  },
  SET_SPOTS(state, spots){
    state.spots = spots
  }
};

export const actions = {
  async getCompanies({commit}){
    await this.$axios.get('companies').then((response)=>{
      commit('SET_COMPANIES_LIST',response.data);
    }).catch((err)=>{

    });
  },
  async getCompany({commit}, company_id){
    await this.$axios.get(`company/${company_id}`).then((response)=>{
      commit('SET_COMPANY',response.data);
    }).catch((err)=>{
    });
  },
  async getAuthTypes({commit}){
    await this.$axios.get('spot/auth/types').then((response)=>{
      commit('SET_AUTH_TYPES',response.data);
    }).catch((err)=>{
    });
  },
  async getSpots({commit},company_id){
    await this.$axios.get(`company/${company_id}/spots`).then((response)=>{
      commit('SET_SPOTS',response.data);
    }).catch((err)=>{

    });
  },
};
