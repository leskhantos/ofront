export const state= ()=>({
  list:[],
  roles:[],
  user:{}
});

export const getters = {
  list(state){
    return state.list;
  },
  roles(state){
    return state.roles;
  },
  user(state){
    return state.user
  }
};

export const mutations = {
  SET_USERS_LIST(state,list){
    state.list = list;
  },
  SET_ROLES(state,roles){
    state.roles = roles
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
  async getRoles({commit}){
    await this.$axios.get('roles').then((response)=>{
      commit('SET_ROLES',response.data);
    });
  },
  async getUser({commit}){
    await this.$axios.get('auth/user').then((res)=>{
      commit('SET_USER',res.data);
    })
  }

};
