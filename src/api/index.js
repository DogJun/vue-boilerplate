import request from './request'

// 获取列表
export const getList = (param) => {
  return request.get('/api/xxx', param)
}

