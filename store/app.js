export const state = () => ({
  set_password_mode: false,
  set_new_user: false,
  set_update_user: false,
  set_new_company: false,
  sidebar_opened: false,
  set_new_spot: false,
  set_new_style: false,
  set_new_account: false,
  confirm_delete:false,
  activate_voucher:false,
  errors: {}
});

export const getters = {
  set_password_mode(state) {
    return state.set_password_mode;
  },
  set_new_user(state) {
    return state.set_new_user;
  },
  set_new_company(state) {
    return state.set_new_company;
  },
  errors(state) {
    return state.errors;
  },
  sidebar_opened(state) {
    return state.sidebar_opened
  },
  set_new_spot(state) {
    return state.set_new_spot;
  },
  set_update_user(state) {
    return state.set_update_user;
  },
  set_new_style(state) {
    return state.set_new_style;
  },
  set_new_account(state) {
    return state.set_new_account;
  },
  confirm_delete(state) {
    return state.confirm_delete;
  },
  activate_voucher(state) {
    return state.activate_voucher;
  },
  get_years(){
    let currentYear = new Date().getFullYear(), years = [], startYear = 2018;
    while (startYear <= currentYear) {
      years.push({id: startYear++});
    }
    return years;
  },
  get_months(){
    return [
      {id: 1, name: 'Январь'},
      {id: 2, name: 'Февраль'},
      {id: 3, name: 'Март'},
      {id: 4, name: 'Апрель'},
      {id: 5, name: 'Май'},
      {id: 6, name: 'Июнь'},
      {id: 7, name: 'Июль'},
      {id: 8, name: 'Август'},
      {id: 9, name: 'Сентябрь'},
      {id: 10, name: 'Октябрь'},
      {id: 11, name: 'Ноябрь'},
      {id: 12, name: 'Декабрь'},
    ];
  },

};

export const mutations = {
  SET_PASSWORD_MODE(state, set_password_mode) {
    state.set_password_mode = set_password_mode;
  },
  SET_NEW_USER(state, set_new_user) {
    state.set_new_user = set_new_user;
  },
  SET_NEW_COMPANY(state, set_new_company) {
    state.set_new_company = set_new_company
  },
  SET_VALIDATION_ERRORS(state, errors) {
    state.errors = errors;
  },
  TOGGLE_SIDEBAR(state, sidebar_opened) {
    state.sidebar_opened = sidebar_opened
  },
  SET_NEW_SPOT(state, set_new_spot) {
    state.set_new_spot = set_new_spot;
  },
  SET_UPDATE_USER(state, set_update_user) {
    state.set_update_user = set_update_user;
  },
  SET_NEW_STYLE(state, set_new_style) {
    state.set_new_style = set_new_style;
  },
  SET_NEW_ACCOUNT(state, set_new_account) {
    state.set_new_account = set_new_account;
  },
  CONFIRM_DELETE(state, confirm_delete) {
    state.confirm_delete = confirm_delete;
  },
  ACTIVATE_VOUCHER(state, activate_voucher) {
    state.activate_voucher = activate_voucher;
  },
};

export const actions = {
  setErrors({commit}, errors) {
    commit('SET_VALIDATION_ERRORS', errors);
  },
  clearErrors({commit}) {
    commit('SET_VALIDATION_ERRORS', {});
  }
};

