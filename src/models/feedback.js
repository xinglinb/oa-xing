import * as feedback from '../services/feedback';
import { message } from "antd";
export default {

  namespace: 'feedback',

  state: {
    feedbacks: [],
    loading: false
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *getFeedbackData({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      let res = yield call(feedback.feedback);
      if (res.success) {
        yield put({ type: 'setData', payload: res.data })
      }
      yield put({ type: 'hideLoading' })
      return res
    },
    *seedFeedback({ payload }, { call, put }) {
      let res = yield call(feedback.seedFeedback, payload);
      if (res.success) {
        yield put({ type: 'getFeedbackData' })
        message.success('已经收到反馈')
      }
      return res
    }
  },

  reducers: {
    setData(state, { payload }) {
      return { ...state, feedbacks: payload };
    },
    showLoading(state) {
      return { ...state, loading: true };
    },
    hideLoading(state) {
      return { ...state, loading: false };
    },
  },

};
