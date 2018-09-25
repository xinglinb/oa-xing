import { post, get, request } from '../utils/request';

export function feedback() {
  return request(`/api/feedback`)
}

export function seedFeedback(params) {
  return post(`/api/feedback`, params)
}

