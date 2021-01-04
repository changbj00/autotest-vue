import axios from 'axios'
import qs from 'qs'
import store from '../store'
import router from '../router'
import promise from 'es6-promise'

axios.defaults.baseURL = 'http://127.0.0.1:8088'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true
axios.defaults.transformRequest = data => qs.stringify(data)
axios.defaults.headers.common['usertoken'] = store.state.usertoken
axios.defaults.timeout = 0

// 添加请求拦截器
axios.interceptors.request.use(config => {
// 在发送请求之前做些什么
// 判断是否存在token，如果存在将每个页面header都添加token
  if (store.state.usertoken) {
    if (Date.now() - JSON.parse(store.state.usertoken).time < 1000 * 60 * 60 * 24) {
      //console.log(Date.now() - JSON.parse(store.state.usertoken).time)
      config.headers.common['usertoken'] = JSON.parse(store.state.usertoken).data
    } else {

    }
    //console.log("11111",JSON.parse(store.state.usertoken).data)
  }
  return config
}, error => {
// 对请求错误做些什么
  console.log(error)
  return promise.reject(error)
})
// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response) {
      //console.log("response", response.data.code)
      switch (response.data.code) {
        case 20001:
          localStorage.clear()
          router.replace({
            path: '/login',
            query: {redirect: router.currentRoute.fullPath}// 登录成功后跳入浏览的当前页面
          });
        case 10000:
          return response.data
      }
    } else {
      if (!window.navigator.onLine) {
        return '断网啦'
      }
    }
    return promise.reject(response)
  })
export default axios
