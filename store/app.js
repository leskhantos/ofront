
export const state= ()=>({
  set_password_mode:false,
  set_new_user:false,
  set_new_company:false,
  sidebar_opened: false,
  set_new_spot:false,
  errors:{}
});

export const getters = {
  set_password_mode(state){
    return state.set_password_mode;
  },
  set_new_user(state){
    return state.set_new_user;
  },
  set_new_company(state){
    return state.set_new_company;
  },
  errors(state){
    return state.errors;
  },
  sidebar_opened(state){
    return state.sidebar_opened
  },
  set_new_spot(state){
    return state.set_new_spot;
  },
};

export const mutations = {
  SET_PASSWORD_MODE(state,set_password_mode){
    state.set_password_mode = set_password_mode;
  },
  SET_NEW_USER(state,set_new_user){
    state.set_new_user = set_new_user;
  },
  SET_NEW_COMPANY(state,set_new_company){
    state.set_new_company = set_new_company
  },
  SET_VALIDATION_ERRORS(state,errors){
    state.errors = errors;
  },
  TOGGLE_SIDEBAR(state,sidebar_opened){
    state.sidebar_opened = sidebar_opened
  },
  SET_NEW_SPOT(state, set_new_spot){
    state.set_new_spot = set_new_spot;
  },
};

export const actions = {
  setErrors({commit}, errors){
    commit('SET_VALIDATION_ERRORS',errors);
  },
  clearErrors({commit}){
    commit('SET_VALIDATION_ERRORS',{});
  }
};

