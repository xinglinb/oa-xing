import { post, get, request, download } from '../utils/request';

export function member(params) {
  return get(`/api/member`, params)
}

export function updataMember(params) {
  return post(`/api/member/${params.key}`, params)
}

export function getMemberExcel(params) {
  return download('/api/member/excel', params)
}


export function recruit(params) {
  return get(`/api/recruit`, params)
}

export function updataRecruitStatus(params) {
  return post(`/api/recruit/${params.id}`, params)
}
