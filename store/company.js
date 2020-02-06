export const state= ()=>({
  companies:[],
  company:[],
  auth_types:[]
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
  async createCompany({commit}, companyData){
    await this.$axios.post('company',companyData).then((response)=>{
    console.log(response.data)
    }).catch((err)=>{
      console.log(err.data)

    });
  },
};
