import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    // 首页
    {
      path: '/',
      name: 'demo',
      component: () => import(/* webpackChunkName: 'demo' */'views/demo/index.vue')
    }
  ]
})
