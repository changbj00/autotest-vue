import axios from 'axios'
import qs from 'qs'
import store from '../store'
import router from '../router'
import promise from 'es6-promise'

axios.defaults.baseURL = 'http://127.0.0.1:8089'
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
    console.log(store.state.usertoken.usertoken)
    config.headers.common['usertoken'] = store.state.usertoken.usertoken
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
    return response.data
  }, error => {
    if (error.response) {
      console.log(error.response)
      switch (error.response.code) {
        case 20001:
          this.$store.commit('delToken')
          router.replace({
            path: '/login',
            query: {redirect: router.currentRoute.fullPath}// 登录成功后跳入浏览的当前页面
          })
      }
    } else {
      if (!window.navigator.onLine) {
        return '断网啦'
      }
    }
    return promise.reject(error.response)
  })
export default axios
