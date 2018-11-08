import request from './request'

// 获取预约列表
export const getList = (param) => {
  return request.get('/retesting/thirdappservice/appointment/list', param)
}
// 获取预约详情
export const getDetail = (param) => {
  return request.get('/retesting/weixin/appointment/detail', param)
}


