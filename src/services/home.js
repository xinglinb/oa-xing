import { post, get, request } from '../utils/request';

export function announce() {
  return request(`api/announce`)
}

export function sendAnnounce(params) {
  return post(`api/announce`, params)
}
