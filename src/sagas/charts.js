import { put, call, takeLatest } from 'redux-saga/effects';
import { api, getAuthHeader } from './api';
import {
  GET_CHARTSDATA,
  GET_APILOADING,
  CHARTSDATA,
  GET_ERROR,
} from '../reducers/charts/charts-data';
import { APIGET_CHARTSDATA } from '../actions/constants';

const getChartsData = authHeader => api.get(APIGET_CHARTSDATA, authHeader);

function* asyncGetChartsData() {
  let errMsg;
  try {
    const authHeader = yield call(getAuthHeader);
    yield put({ type: GET_APILOADING, payload: true });
    // const response = yield call(getChartsData, authHeader);
    // if (response) {
    //   const { errorMsg } = response.data;
    //   errMsg = errorMsg;
    //   yield put({ type: CHARTSDATA, payload: response.data });
    // }

    const chartsData = {
      newMembership: {
        JAN: 3,
        FEB: 1,
        MAR: 0,
        APR: 5,
        MAY: 2,
        JUN: 3,
        JUL: 1,
        AUG: 3,
        SEP: 0,
        OCT: 1,
        NOV: 0,
        DEC: 0,
      },
      renewedMembership: {
        JAN: 4,
        FEB: 2,
        MAR: 1,
        APR: 6,
        MAY: 3,
        JUN: 4,
        JUL: 2,
        AUG: 4,
        SEP: 1,
        OCT: 2,
        NOV: 1,
        DEC: 1,
      },
      expiringMembership: {
        JAN: 0,
        FEB: 0,
        MAR: 1,
        APR: 2,
        MAY: 3,
        JUN: 3,
        JUL: 4,
        AUG: 5,
        SEP: 6,
        OCT: 1,
        NOV: 1,
        DEC: 0,
      },
      membersAges: {
        '15 - 19': 12,
        '20 - 24': 1,
        '25 - 29': 5,
        '30 - 34': 5,
        '35 - 39': 0,
        '40 - 44': 2,
        '45 - 49': 9,
        '50 - 54': 11,
        '55 - 59': 0,
        '60+': 9,
      },
      eventsFinance: [
        {
          eventId: '1',
          name: 'xxx',
          startDate: '2013-10-11',
          endDate: '2938-10-30',
          income: [
            { category: 'tickets', amount: 100.3 },
            { category: 'donation', amount: 300.99 },
          ],
          expenditure: [
            { category: 'transportation', amount: 28 },
            { category: 'food', amount: 500.4 },
          ],
        },
        {
          eventId: '2',
          name: 'xxx',
          startDate: '2013-10-11',
          endDate: '2938-10-30',
          income: [
            { category: 'tickets', amount: 100.3 },
            { category: 'donation', amount: 300.99 },
          ],
          expenditure: [
            { category: 'transportation', amount: 28 },
            { category: 'food', amount: 500.4 },
          ],
        },
      ],
      incidentCategories: [
        { type: 'sexual harassment', total: 2 },
        { type: 'quarrel with employer', total: 3 },
        { type: 'others', total: 10 },
      ],
    };
    yield put({ type: CHARTSDATA, payload: chartsData });
  } catch (e) {
    errMsg = e.message;
  } finally {
    // yield put({ type: GET_ERROR, payload: errMsg });
    yield put({ type: GET_ERROR, payload: '' });
    yield put({ type: GET_APILOADING, payload: false });
  }
}

export default takeLatest(GET_CHARTSDATA, asyncGetChartsData);
