import Vue from "vue";

export const state = () => ({
  vouchers: [],
  lists:[],
  vouchersToPrint:[]
});

export const getters = {
  vouchers: state => state.vouchers,
  lists: state => state.lists,
  vouchersToPrint: state => state.vouchersToPrint
};

export const mutations = {
  SET_VOUCHERS: (state, vouchers) => state.vouchers = vouchers,
  SET_LISTS: (state, lists) => state.lists = lists,
  SET_PRINT_VOUCHERS: (state, vouchersToPrint) => state.vouchersToPrint = vouchersToPrint,
};

export const actions = {
  async generateVouchers({commit}, spot_id) {
    await this.$axios.get(`vouchers/${spot_id}/generate`);
  },
  async getVouchers({commit}, payload) {
    const response = await this.$axios.get(`vouchers/${payload.spot_id}/spot?activity=${payload.activity}`);
    commit('SET_VOUCHERS', response.data);
  },
  async getLists({commit},spot_id) {
    const response = await this.$axios.get(`vouchers/${spot_id}/list`);
    commit('SET_LISTS', response.data);
  },
  async getPrintVouchers({commit},list_id) {
    const response = await this.$axios.get(`list/${list_id}/vouchers`);
    commit('SET_PRINT_VOUCHERS', response.data);
  },
};
