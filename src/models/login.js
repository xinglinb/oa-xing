import * as login from '../services/login';
export default {

  namespace: 'login',

  state: {
    nav: [
      {
        url: '/',
        icon: 'home',
        name: '首页',
        role: 0
      },
      {
        url: '/member',
        icon: 'user',
        name: '成员',
        role: 1
      },
      {
        url: '/report',
        icon: 'copy',
        name: '汇报',
        role: 0
      },
      {
        url: '/feedback',
        icon: 'edit',
        name: '反馈',
        role: 1
      },
      {
        url: '/setting',
        icon: 'setting',
        name: '设置',
        role: 0
      },
    ],
    user: {},
    feedbackType: [],
    campus: [],
    departs: [],
    memberStatus: [],
    recruitStatus: [
      { key: 0, value: '回绝' },
      { key: 1, value: '一面中' },
      { key: 2, value: '二面中' },
      { key: 3, value: '考核期中' },
      { key: 4, value: '正式入职' },
      { key: 5, value: '转给其他部门' },
    ]
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *login({ payload }, { call, put }) {
      let res = yield call(login.login, payload);
      return res
    },
    *logout({ payload }, { call }) {
      let res = yield call(login.logout);
      return res
    },
    *getUser({ payload }, { call, put }) {
      let res = yield call(login.getUser);
      if (res.success) {
        yield put({ type: 'setData', payload: res.data })
      }
      return res
    },
  },

  reducers: {
    showLoading(state) {
      return { ...state, loginLoading: true };
    },
    setData(state, { payload }) {
      return {
        ...state,
        user: payload[0],
        campus: payload[1].campus,
        departs: payload[1].departs,
        feedbackType: payload[1].feedbackType,
        memberRole: payload[1].memberRole,
        memberStatus: payload[1].memberStatus,
      };
    }
  },

};
