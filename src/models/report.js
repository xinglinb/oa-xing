import * as report from '../services/report';
import { message } from "antd";
export default {

  namespace: 'report',

  state: {
    reportStatus: {},
    reportHistory: [],
    examReport: [],
    searchFrom: {
      depart: '',
      campus: '',
      contact: ''
    },
    examLoading: false
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *getReportStatus({ payload }, { call, put, select }) {
      let params = yield select(state => state.login.user);
      let res = yield call(report.reportStatus, { uid: params.uid });
      if (res.success) {
        yield put({ type: 'setStatusData', payload: res.data })
      }
      return res
    },
    *sendReport({ payload }, { call, put }) {
      let res = yield call(report.report, payload);
      if (res.success) {
        message.success('汇报成功')
        yield put({ type: 'setStatusData', payload: res.data })
      }
      return res
    },
    *getReportHistory({ payload }, { call, put, select }) {
      let params = yield select(state => state.login.user);
      let res = yield call(report.reportHistory, { uid: params.uid });
      if (res.success) {
        yield put({ type: 'setHistoryData', payload: res.data })
      }
      return res
    },
    *getExamReport({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' })
      let params = yield select(state => state.report.searchFrom);
      let res = yield call(report.examReport, params);
      if (res.success) {
        yield put({ type: 'setExamData', payload: res.data })
      }
      yield put({ type: 'hideLoading' })
      return res
    },
    *getExamReportFromForm({ payload }, { call, put, select }) {
      yield put({ type: 'setFormData', payload })
      yield put({ type: 'getExamReport' })
    },
    *getReportExcel({ payload }, { call, put, select }) {
      let params = yield select(state => state.report.examReport);
      yield call(report.getRepotExcel, {
        start_date: params[0].start_date,
        end_date: params[0].end_date,
      });
    },
    *examReport({ payload }, { call, put }) {
      let res = yield call(report.review, payload);
      if (res.success) {
        message.success('审核成功')
        // yield put({ type: 'setStatusData', payload: res.data })
      }
      return res
    },
  },

  reducers: {
    setStatusData(state, { payload }) {
      return { ...state, reportStatus: payload };
    },
    setHistoryData(state, { payload }) {
      return { ...state, reportHistory: payload };
    },
    setExamData(state, { payload }) {
      return { ...state, examReport: payload };
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
    showLoading(state) {
      return { ...state, examLoading: true };
    },
    hideLoading(state) {
      return { ...state, examLoading: false };
    },
  },

};
