import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    usertoken: localStorage.getItem('usertoken') ? localStorage.getItem('usertoken') : ''
  },
  mutations: {
    setToken (state, usertoken) {
      console.log('usertoken:', usertoken)
      state.usertoken = usertoken
      localStorage.setItem('usertoken', usertoken.usertoken)
    },
    delToken (state) {
      state.usertoken = ''
      localStorage.removeItem('usertoken')
    }
  }
})
export default store
