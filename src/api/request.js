import axios from 'axios'
import Vue from 'vue'
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.baseURL = process.env.API_HOST
// 请求拦截
axios.interceptors.request.use(
  config => {
    // 发送请求之前做一些处理
    console.log('请求前')
    Vue.prototype.$loading.show()
    return config
  },
  error => {
    // 当请求异常时做一些处理
    Vue.prototype.$loading.hide()
    return Promise.reject(error)
  }
)
// 响应拦截
axios.interceptors.response.use(
  res => {
    Vue.prototype.$loading.hide()
    return res
  },
  error => {
    Vue.prototype.$loading.hide()
    return Promise.resolve(error.response)
  }
)

export default {
  post (url, data) {
    return axios({
      method: 'post',
      data,
      url
    }).then(res => {
      console.log(res)
    })
  },
  get (url, params) {
    // 测试环境拼接app_mid
    if (process.env.NODE_ENV === 'test') {
      params.app_mid = '39e8e2fb-a206-1560-0e71-06fc98ebb394'
    }
    return axios({
      method: 'get',
      url,
      params
    }).then(res => {
      if (res.data.errcode === "0") {
        return Promise.resolve(res.data)
      } else {
        console.log(res.data.errmsg)
      }
    })
  }
}