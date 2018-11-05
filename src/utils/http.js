import axios from 'axios'

export default (function () {
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  axios.defaults.baseURL = process.env.VUE_APP_API_URL

  axios.interceptors.request.use(
    config => {
      return config
    },
    err => {
      return Promise.reject(err)
    })

  return {
    post (url, params = {}) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: url,
          data: params,
          transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
              if (data.hasOwnProperty(it)) {
                let val = data[it]
                if (val instanceof Object) {
                  val = JSON.stringify(val)
                }
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(val) + '&'
              }
            }
            return ret
          }]
        }).then(response => {
          resolve(response.data)
        })
          .catch((error) => {
            reject(error)
          })
      })
    },

    get (url, params = {}) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: url,
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          },
          params: params
        }).then(response => {
          resolve(response.data)
        })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
})()
