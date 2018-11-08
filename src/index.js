import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

import 'lib-flexible'
import 'common/styles/index.less'

import D, { Alert, Confirm, Toast, Loading } from 'components/messagebox'
Vue.use(D)
Vue.use(Alert)
Vue.use(Confirm)
Vue.use(Toast)
Vue.use(Loading)

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
