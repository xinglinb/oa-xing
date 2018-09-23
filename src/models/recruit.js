import * as recruit from '../services/member';
import { message } from "antd";
import md5 from "md5";
export default {

  namespace: 'recruit',

  state: {
    loading: false,
    recruits: [],
    actRecruit: {},
    searchFrom: {
      depart: '',
      campus: ''
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *getRecruit({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' })
      let params = yield select(state => state.recruit.searchFrom);
      let res = yield call(recruit.recruit, params);
      if (res.success) {
        yield put({ type: 'setRecruitsData', payload: res.data.data })
      }
      yield put({ type: 'hideLoading' })
      return res
    },
    *getRecruitFromForm({ payload }, { call, put, select }) {
      yield put({ type: 'setFormData', payload })
      yield put({ type: 'getRecruit' })
    },
    *getRecruitDetail({ payload }, { call, put, select }) {
      let res = yield call(recruit.recruit, { id: payload.key });
      yield put({ type: 'changeRecruit', payload: res.data })
    },
    *updataRecruitStatus({ payload }, { call, put, select }) {
      let params = yield select(state => state.recruit.actRecruit);
      let res = yield call(recruit.updataRecruitStatus, {
        id: params.key,
        ...payload
      });
      if (res.success) {
        message.success('更新成功！')
        yield put({ type: 'changeRecruit', payload: res.data })
      }
      return res
    },
    *getMemberExcel({ payload }, { call, put, select }) {
      let params = yield select(state => state.member.searchFrom);
      yield call(recruit.getMemberExcel, params);
    },
  },

  reducers: {
    setRecruitsData(state, { payload }) {
      return { ...state, recruits: payload };
    },
    setFormData(state, { payload }) {
      return {
        ...state,
        searchFrom: {
          ...state.searchFrom,
          [payload.key]: payload.value
        }
      }
    },
    changeRecruit(state, { payload }) {
      return { ...state, actRecruit: payload };
    },
    showLoading(state) {
      return { ...state, loading: true };
    },
    hideLoading(state) {
      return { ...state, loading: false };
    },
  },

};
