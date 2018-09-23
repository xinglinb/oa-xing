import * as setting from '../services/setting';
import { message } from "antd";
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';

export default {

  namespace: 'setting',

  state: {
    status: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *changeInfo({ payload }, { call, put, select }) {
      let params = yield select(state => state.login.user);
      let res = yield call(setting.changeInfo, {
        ...payload,
        key: params.uid,
        stuid: params.stuid
      });
      if (res.success) {
        message.success('修改成功！')
      }
      return res
    },
    *changePwd({ payload }, { call, put, select }) {
      let params = yield select(state => state.login.user);
      let res = yield call(setting.changePwd, {
        ...payload,
        uid: params.uid
      });
      if (res.success) {
        message.success('修改成功！')
      }
      return res
    },
    *getStatus({ payload }, { call, put, select }) {
      let res = yield call(setting.getStatus);
      if (res.success) {
        yield put({ type: 'setStatusDate', payload: res.data })
      }
      return res
    },
    *changeStatus({ payload }, { call, put, select }) {
      if (payload) {
        yield put({ type: 'setStatus', payload: 'open' })
      } else {
        let res = yield call(setting.changeStatus, { report_stat: 'close' });
        if (res.success) {
          message.success('修改成功！')
          yield put({ type: 'setStatus', payload: 'close' })
        }
        return res
      }
    },
    *openStatus({ payload }, { call, put, select }) {
      // let params = yield select(state => state.setting.status);
      let res = yield call(setting.changeStatus, {
        report_end_date: moment(payload.report_date[1]).format(dateFormat),
        report_start_date: moment(payload.report_date[0]).format(dateFormat),
        report_stat: 'open',
        review_end_date: moment(payload.review_date[1]).format(dateFormat),
        review_start_date: moment(payload.review_date[0]).format(dateFormat),
        work_end_date: moment(payload.work_date[1]).format(dateFormat),
        work_start_date: moment(payload.work_date[0]).format(dateFormat)
      });
      if (res.success) {
        message.success('修改成功！')
        yield put({ type: 'setStatus', payload: 'open' })
      }
      return res
    },
  },

  reducers: {
    setStatus(state, { payload }) {
      return {
        ...state, status: {
          ...state.status,
          report_stat: payload
        }
      };
    },
    setStatusDate(state, { payload }) {
      return {
        ...state, status: payload
      };
    },
  },

};
