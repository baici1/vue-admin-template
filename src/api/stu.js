import request from '@/utils/request'

export function getdata(query) {
  return request({
    url: '/des/get',
    method: 'GET',
    params: query,
    baseURL: 'http://47.113.203.60:8081'
  })
}
export function upateddata(query) {
  return request({
    url: '/des/update',
    method: 'POST',
    data: query,
    baseURL: 'http://47.113.203.60:8081'
  })
}

export function updateone(query) {
  return request({
    url: 'des/one',
    method: 'POST',
    data: query,
    baseURL: 'http://127.0.0.1:8081'
  })
}

export function updatetwo(query) {
  return request({
    url: 'des/two',
    method: 'POST',
    data: query,
    baseURL: 'http://127.0.0.1:8081'
  })
}
