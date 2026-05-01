import request from './request'

export const loginApi = (data) => {
  return request({
    url: '/ramcome/mytest',
    method: 'post',
    data
  })
}