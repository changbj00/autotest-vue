import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/login'
import home from '@/view/home'
import register from '@/view/register'
import forgot from '@/view/forgot'
import store from '@/store/index'
import vueRsource from 'vue-resource'

Vue.use(vueRsource)
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {// 将home页设置为需要登录验证
        requireAuth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/forgot',
      name: 'forgot',
      component: forgot
    }
  ]
})
// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断跳转的路由是否需要登录
    if (store.state.usertoken) {
      console.log(store.state.usertoken)
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
  // if (to.path === '/login') {
  //   next()
  // } else {
  //   let token = localStorage.getItem('usertoken')
  //   if (token === '' || token === 'null') {
  //     next('/login')
  //   } else {
  //     next()
  //   }
  // }
})
// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export default router
