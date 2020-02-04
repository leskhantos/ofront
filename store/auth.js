const cookieparser = process.server ? require('cookieparser') : undefined
import axios from 'axios'

export const state = () => {
  return {
    access_token: ''
  }
}
export const mutations = {
  access_token(state, access_token) {
    state.access_token = access_token
  }
}
export const actions = {
  async login({commit}, params){
    try{
      let res  = await axios.post('http://127.0.0.1:8000/auth/login',params);
      console.log(res.data.access_token);

        commit('access_token', res.data.access_token)
        this.$axios.setToken(res.data.access_token , 'Bearer');
        Cookie.set('access_token', res.data.access_token)
        console.log(res.data.access_token)

    }catch (err) {
      if (error.response.status === 401) {
        console.log("err:" +err)
      }
    }
  },
  logout({ commit }) {
    commit('access_token', null);
    Cookie.remove('access_token');
    this.$router.push({ name: 'index' });
  }
}
