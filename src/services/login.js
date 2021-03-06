import { post, get, request } from '../utils/request';

export function login(params) {
  return post(`/api/login`, params)
}

export function logout() {
  return request(`/api/logout`)
}

export function getUser() {
  return request(`/api/getUserByStuid`)
}
