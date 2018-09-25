import * as member from '../services/member';
import { message } from "antd";
import md5 from "md5";
export default {

  namespace: 'member',

  state: {
    loading: false,
    members: [],
    actMember: {},
    searchFrom: {
      period: 13,
      depart: '',
      campus: '',
      content: ''
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *getMember({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' })
      let params = yield select(state => state.member.searchFrom);
      let res = yield call(member.member, params);
      if (res.success) {
        yield put({ type: 'setMemberData', payload: res.data.members })
      }
      yield put({ type: 'hideLoading' })
      return res
    },
    *getMemberFromForm({ payload }, { call, put, select }) {
      yield put({ type: 'setFormData', payload })
      yield put({ type: 'getMember' })
    },
    *updataMember({ payload }, { call, put, select }) {
      let params = yield select(state => state.member.actMember);
      let res = yield call(member.updataMember, {
        ...params,
        ...payload,
        password: payload.password ? md5(payload.password) : ''
      });
      if (res.success) {
        message.success('更新成功！')
        yield put({ type: 'getMember' })
      }
      return res
    },
    *getMemberExcel({ payload }, { call, put, select }) {
      let params = yield select(state => state.member.searchFrom);
      yield call(member.getMemberExcel, params);
    },
  },

  reducers: {
    setMemberData(state, { payload }) {
      return { ...state, members: payload };
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
    changeMember(state, { payload }) {
      return { ...state, actMember: payload };
    },
    showLoading(state) {
      return { ...state, loading: true };
    },
    hideLoading(state) {
      return { ...state, loading: false };
    },
  },

};
