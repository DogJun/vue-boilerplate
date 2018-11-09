import request from './request'

// 获取预约列表
export const getList = (param) => {
  return request.get('/retesting/thirdappservice/appointment/list', param)
}
// 获取预约详情
export const getDetail = (param) => {
  return request.get('/retesting/thirdappservice/appointment/detail', param)
}
// 获取预约须知
export const getNoticeDetail = (param) => {
  return request.get('/retesting/thirdappservice/appointment/view-detail', param)
}
// 获取预约详情
export const getOrderDetail = (param) => {
  return request.get('/retesting/thirdappservice/appointment/detail', param)
}
