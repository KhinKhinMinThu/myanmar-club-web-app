import { put, call, takeLatest } from 'redux-saga/effects';
import { api, getAuthHeader } from './api';
import {
  GET_EVENTTRANSACDATA,
  GET_APILOADING,
  EVENTTRANSACDATA,
  GET_ERROR,
  POST_APILOADING,
  POST_DELETETRANSC,
  POST_ADDTRANSC,
  POST_ERROR,
} from '../reducers/event-transaction/event-transaction-data';
import {
  APIGET_EVENTTRANSCDATA,
  APIPOST_DELETE_EVENTTRANSC,
  APIPOST_ADD_EVENTTRANSC,
} from '../actions/constants';

// GET REQUEST
const getEventTranscData = authHeader => api.get(APIGET_EVENTTRANSCDATA, authHeader);

function* asyncGetEventTranscData() {
  let errMsg;
  try {
    const authHeader = yield call(getAuthHeader);
    yield put({ type: GET_APILOADING, payload: true });
    const response = yield call(getEventTranscData, authHeader);
    const { eventsData, errorMsg } = response.data;
    errMsg = errorMsg;
    yield put({ type: EVENTTRANSACDATA, payload: eventsData });
  } catch (e) {
    errMsg = e.message;
  } finally {
    yield put({ type: GET_ERROR, payload: errMsg });
    yield put({ type: GET_APILOADING, payload: false });
  }
}
// end

// POST REQUEST
const postDeleteEventTransc = (eventTranscToDelete, authHeader) => api.post(
  APIPOST_DELETE_EVENTTRANSC,
  {
    eventId: eventTranscToDelete.eventId,
    transacIdToRemove: eventTranscToDelete.transacIdToRemove,
  },
  authHeader,
);

const postAddEventTransc = (eventTranscToAdd, authHeader) => api.post(
  APIPOST_ADD_EVENTTRANSC,
  {
    eventId: eventTranscToAdd.eventId,
    transacDataToAdd: eventTranscToAdd.transacDataToAdd,
  },
  authHeader,
);

function* asyncPostProcessEventTransc(action) {
  let errMsg;
  try {
    const authHeader = yield call(getAuthHeader);
    yield put({ type: POST_APILOADING, payload: true });
    let response;

    console.log(
      'Calling API.........',
      action.type,
      action.eventTranscToDelete,
      action.eventTranscToAdd,
    );

    if (action.type === POST_DELETETRANSC) {
      response = yield call(
        postDeleteEventTransc,
        action.eventTranscToDelete,
        authHeader,
      );
    }
    if (action.type === POST_ADDTRANSC) {
      response = yield call(
        postAddEventTransc,
        action.eventTranscToAdd,
        authHeader,
      );
    }

    const { errorMsg } = response.data;
    errMsg = errorMsg;
  } catch (e) {
    errMsg = e.message;
  } finally {
    yield put({ type: POST_ERROR, payload: errMsg });
    yield put({ type: POST_APILOADING, payload: false });
  }
}
// end

export const getEventTranscDataSaga = takeLatest(
  GET_EVENTTRANSACDATA,
  asyncGetEventTranscData,
);
export const postDeleteTranscSaga = takeLatest(
  POST_DELETETRANSC,
  asyncPostProcessEventTransc,
);
export const postAddTranscSaga = takeLatest(
  POST_ADDTRANSC,
  asyncPostProcessEventTransc,
);
