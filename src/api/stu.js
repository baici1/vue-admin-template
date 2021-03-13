import request from '@/utils/request'
export function getdata(query) {
  return request({
    url: '/des/get',
    method: 'GET',
    params: query,
    baseURL: 'http://127.0.0.1:8081'
  })
}
