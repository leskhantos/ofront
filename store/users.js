export const state= ()=>({
  list:[],
  types:[],
  user:{}
});

export const getters = {
  list(state){
    return state.list;
  },
  types(state){
    return state.types;
  },
  user(state){
    return state.user
  },
  activeUsers(state){
    let activeUsers = state.list.filter(function (val) {
      return val.enabled === 1
    })
    return activeUsers;
  }
};

export const mutations = {
  SET_USERS_LIST(state,list){
    state.list = list;
  },
  SET_TYPES(state,types){
    state.types = types
  },
  SET_USER(state,user){
    state.user = user
  }
};

export const actions = {
  async getUsers({commit}){
    await this.$axios.get('users').then((response)=>{
      commit('SET_USERS_LIST',response.data);
    });
  },
  async getTypes({commit}){
    await this.$axios.get('spots/types').then((response)=>{
      commit('SET_TYPES',response.data);
    });
  },
  async getUser({commit}){
    await this.$axios.get('auth/user').then((res)=>{
      commit('SET_USER',res.data);
    })
  }

};
