import { post, get, request } from '../utils/request';

export function changeInfo(params) {
  return post(`/api/member/${params.key}`, params)
}

export function changePwd(params) {
  return post(`/api/member/pwd`, params)
}

export function getStatus() {
  return request(`/api/report/status`)
}

export function changeStatus(params) {
  return post(`/api/report/status`, params)
}
