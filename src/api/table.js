import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/getalldata',
    method: 'GET',
    params: query,
    baseURL: 'http://47.113.203.60:8081'
  })
}

export function deletelist(query) {
  return request({
    url: '/delete',
    method: 'GET',
    params: query,
    baseURL: 'http://47.113.203.60:8081'
  })
}

export function updatelist(form) {
  return request({
    url: '/user/form',
    method: 'POST',
    data: form,
    baseURL: 'http://47.113.203.60:8081'
  })
}
export function addlist(form) {
  return request({
    url: '/register',
    method: 'POST',
    data: form,
    baseURL: 'http://47.113.203.60:8081'
  })
}
export function download() {
  return request({
    url: '/download',
    method: 'GET',
    baseURL: 'http://47.113.203.60:8081'
  })
}
export function searchlist(query) {
  return request({
    url: '/user/alldata',
    method: 'GET',
    params: query,
    baseURL: 'http://47.113.203.60:8081'
  })
}
