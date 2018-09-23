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
    user: {
      uid: 80,
      avatar: '/api/avatar/test.jpg',
      stuid: 2015213740,
      name: '邢力',
      depart: 3,
      role: 2
    },
    feedbackType: [
      { key: '0', text: '吐槽' },
      { key: '1', text: 'Bug' },
      { key: '2', text: '脑洞大开' }],
    memberStatus: [
      { key: '0', text: '未知', value: '未知' },
      { key: '1', text: '正常', value: '正常' },
      { key: '2', text: '离职', value: '离职' },
      { key: '3', text: '黑名单', value: '黑名单' }],
    memberRole: [
      { key: '0', text: '成员', value: '成员' },
      { key: '1', text: '部长', value: '部长' },
      { key: '2', text: '行政', value: '行政' },
      { key: '3', text: '总监/主管', value: '总监/主管' }],
    campus: [
      { text: '屯溪路校区', value: '屯溪路校区', key: '0', },
      { text: '翡翠湖校区', value: '翡翠湖校区', key: '0', }],
    departs: [
      { text: '明理四美', value: '明理四美', key: '0' },
      { text: '办公室', value: '办公室', key: '1' },
      { text: '推广部', value: '推广部', key: '2' },
      { text: '技术部', value: '技术部', key: '3' },
      { text: '视觉设计部', value: '视觉设计部', key: '4' },
      { text: '产品部', value: '产品部', key: '5' },
      { text: '视频部', value: '视频部', key: '6' },
      { text: '编辑部', value: '编辑部', key: '7' },
      { text: '微信微博部', value: '微信微博部', key: '8' },
      { text: '策划部', value: '策划部', key: '9' }],
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
    *login({ payload }, { call, }) {
      let res = yield call(login.login, payload);
      return res
    },
    *logout({ payload }, { call, }) {
      console.log('++++++++');

      let res = yield call(login.logout);
      return res
    },
    *getUser({ payload }, { call, }) {
      let res = yield call(login.getUser);
      console.log(res)
      return res
    },
  },

  reducers: {
    showLoading(state) {
      return { ...state, loginLoading: true };
    },
  },

};
