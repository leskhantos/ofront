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
    let users = await this.$axios.get('users');
    commit('SET_USERS_LIST',users.data);
  },
};
