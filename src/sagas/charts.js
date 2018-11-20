import { put, call, takeLatest } from 'redux-saga/effects';
import { api, getAuthHeader } from './api';
import {
  GET_CHARTSDATA,
  GET_APILOADING,
  CHARTSDATA,
  GET_ERROR,
} from '../reducers/charts/charts-data';
import { GET_TASKDATA, TASKDATA } from '../reducers/task-list/task-list-data';
import { APIGET_CHARTSDATA, APIGET_TASKDATA } from '../actions/constants';

const getChartsData = authHeader => api.get(APIGET_CHARTSDATA, authHeader);
const getTaskData = authHeader => api.get(APIGET_TASKDATA, authHeader);

function* asyncGetChartsData(action) {
  let errMsg;
  try {
    const authHeader = yield call(getAuthHeader);
    let response;

    yield put({ type: GET_APILOADING, payload: true });
    if (action.type === GET_CHARTSDATA) {
      response = yield call(getChartsData, authHeader);
      if (response) {
        const { errorMsg } = response.data;
        errMsg = errorMsg;
        yield put({ type: CHARTSDATA, payload: response.data });
        yield put({ type: GET_TASKDATA });
      } else {
        errMsg = 'Error: Request failed with status code 404';
      }
    }
    if (action.type === GET_TASKDATA) {
      response = yield call(getTaskData, authHeader);
      if (response) {
        const { errorMsg, taskData } = response.data;
        errMsg = errorMsg;
        yield put({ type: TASKDATA, payload: taskData });
      } else {
        errMsg = 'Error: Request failed with status code 404';
      }
    }
  } catch (e) {
    errMsg = e.message;
  } finally {
    yield put({ type: GET_ERROR, payload: errMsg });
    yield put({ type: GET_APILOADING, payload: false });
  }
}

export const getChartsSaga = takeLatest(GET_CHARTSDATA, asyncGetChartsData);
export const getTasksSaga = takeLatest(GET_TASKDATA, asyncGetChartsData);
