
export const state= ()=>({
  set_password_mode:false,
  set_new_user:false,
});

export const getters = {
  set_password_mode(state){
    return state.set_password_mode;
  },
  set_new_user(state){
    return state.set_new_user;
  },

};

export const mutations = {
  SET_PASSWORD_MODE(state,set_password_mode){
    state.set_password_mode = set_password_mode;
  },
  SET_NEW_USER(state,set_new_user){
    state.set_new_user = set_new_user;
  },

};

