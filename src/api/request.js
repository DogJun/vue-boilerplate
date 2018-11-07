import axios from 'axios'

axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = process.env.API_HOST
axios.interceptors.request.use(
  config => {
    // 发送请求之前做一些处理
    console.log('请求前')
    return config
  },
  error => {
    // 当请求异常时做一些处理
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  res => {
    return res
  },
  error => {
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
    return axios({
      method: 'get',
      url,
      params
    }).then(res => {
      console.log(res)
    })
  }
}