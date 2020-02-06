export const state= ()=>({
  list:[]
});

export const getters = {
  list(state){
    return state.list;
  }
};

export const mutations = {
  SET_USERS_LIST(state,list){
    state.list = list;
  }
};

export const actions = {
  async getUsers({commit}){
    await this.$axios.get('users').then((response)=>{
      commit('SET_USERS_LIST',response.data);
    });
  },
  async createUser({commit}, userData){
   await this.$axios.post('user').then((response)=>{
     console.log(response)
   });
  },
};
