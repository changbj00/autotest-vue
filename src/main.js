// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/index'
import api from './api/http'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';


Vue.use(ViewUI);
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$axios = api
Vue.prototype.router=router

new Vue({
  el: '#app',
  store,
  router,
  // render: h => (App)
  components: { App },
  template: '<App/>'
})
