import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // 首页
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: 'home' */'views/home/index.vue')
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import(/* webpackChunkName: 'demo' */'views/demo/index.vue')
    },
    // 交付预约
    {
      path: '/order',
      name: 'order',
      component: () => import(/* webpackChunkName: 'order' */'views/order/index.vue')
    },
    // 确认预约
    {
      path: '/confirm',
      name: 'confirm',
      component: () => import(/* webpackChunkName: 'confirm' */'views/confirm/index.vue')
    },
  ]
})
