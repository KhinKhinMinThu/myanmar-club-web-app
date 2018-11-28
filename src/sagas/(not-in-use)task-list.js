import { put, call, takeLatest } from 'redux-saga/effects';
import { api, getAuthHeader } from './api';
import {
  GET_TASKDATA,
  GET_APILOADING,
  TASKDATA,
  GET_ERROR,
} from '../reducers/task-list/task-list-data';
import { APIGET_TASKDATA } from '../actions/constants';

const getTaskData = authHeader => api.get(APIGET_TASKDATA, authHeader);

function* asyncGetTaskData() {
  let errMsg;
  try {
    const authHeader = yield call(getAuthHeader);
    yield put({ type: GET_APILOADING, payload: true });
    const response = yield call(getTaskData, authHeader);
    if (response) {
      const { errorMsg, taskData } = response.data;
      errMsg = errorMsg;
      yield put({ type: TASKDATA, payload: taskData });
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

export default takeLatest(GET_TASKDATA, asyncGetTaskData);
