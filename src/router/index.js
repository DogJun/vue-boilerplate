import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    // 首页
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: 'home' */'views/home/index.vue')
    },
    // 交付预约
    {
      path: '/order/:id',
      name: 'order',
      component: () => import(/* webpackChunkName: 'order' */'views/order/index.vue')
    },
    // 确认预约
    {
      path: '/confirm/:id',
      name: 'confirm',
      component: () => import(/* webpackChunkName: 'confirm' */'views/confirm/index.vue')
    },
    // 预约详情
    {
      path: '/detail',
      name: 'detail',
      component: () => import(/* webpackChunkName: 'detail' */'views/detail/index.vue')
    },
    // 交付须知
    {
      path: '/inform/:id',
      name: 'inform',
      component: () => import(/* webpackChunkName: 'inform' */'views/inform/index.vue')
    }
  ]
})
