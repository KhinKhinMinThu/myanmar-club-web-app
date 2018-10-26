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
    const response = yield call(getChartsData, authHeader);
    if (response) {
      const { errorMsg } = response.data;
      errMsg = errorMsg;
      yield put({ type: CHARTSDATA, payload: response.data });
    } else {
      errMsg = 'Error: Request failed with status code 404';
    }
  } catch (e) {
    errMsg = e.message;
  } finally {
    yield put({ type: GET_ERROR, payload: errMsg });
    yield put({ type: GET_APILOADING, payload: false });
  }
}

export default takeLatest(GET_CHARTSDATA, asyncGetChartsData);
