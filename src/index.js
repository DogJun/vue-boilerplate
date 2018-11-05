import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import api from './api'

import 'lib-flexible'
import 'common/styles/index.less'

Vue.config.productionTip = false
Vue.prototype.api = api
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
