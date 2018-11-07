import request from './request'

export const getList = (param) => {
  request.post('/retesting/weixin/appointment/list', param)
}
