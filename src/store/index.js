import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    usertoken: localStorage.getItem('usertoken') ? localStorage.getItem('usertoken') : '',
    user: {},
    table:{}
  },
  mutations: {
    setToken (state, key) {
      state.usertoken = key
      var time=new Date().getTime()
      localStorage.setItem('usertoken', JSON.stringify({data:key.usertoken,time:time}))
    },
    getToken (key){
      var dataObj=JSON.parse(localStorage.getItem(key))
      if (new Date().getTime() - dataObj.time>1000*60*60) {
        console.log('信息已过期');
      }else{
        console.log("data="+dataObj.data);
        console.log(JSON.parse(dataObj.data));
        var dataObjDatatoJson = JSON.parse(dataObj.data)
        return dataObjDatatoJson;
      }
    },
    setUser(state,key){
      var time=new Date().getTime()
      state.user=key
      localStorage.setItem('user',JSON.stringify({data:key,time:time}))
    },
    delAll () {
      //console.log("1111111")
      localStorage.clear()
    },
  }
})
export default store
