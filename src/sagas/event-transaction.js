import { put, call, takeLatest } from 'redux-saga/effects';
import api from './api';
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

const getEventTranscData = () => api.get('/event/getEventsTranscData');

function* asyncGetEventTranscData() {
  let errMsg;
  try {
    yield put({ type: GET_APILOADING, payload: true });
    const response = yield call(getEventTranscData);
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

const postDeleteEventTransc = eventTranscToDelete => api.post('/event/deleteEventTransaction', {
  eventId: eventTranscToDelete.eventId,
  transacIdToRemove: eventTranscToDelete.transacIdToRemove,
});

const postAddEventTransc = eventTranscToAdd => api.post('/event/addEventTransaction', {
  eventId: eventTranscToAdd.eventId,
  transacDataToAdd: eventTranscToAdd.transacDataToAdd,
});

function* asyncPostProcessEventTransc(action) {
  let errMsg;
  try {
    yield put({ type: POST_APILOADING, payload: true });
    let response;

    console.log(
      'Calling API.........',
      action.type,
      action.eventTranscToDelete,
      action.eventTranscToAdd,
    );

    if (action.type === POST_DELETETRANSC) response = yield call(postDeleteEventTransc, action.eventTranscToDelete);
    if (action.type === POST_ADDTRANSC) response = yield call(postAddEventTransc, action.eventTranscToAdd);
    const { errorMsg } = response.data;
    errMsg = errorMsg;
  } catch (e) {
    errMsg = e.message;
  } finally {
    yield put({ type: POST_ERROR, payload: errMsg });
    yield put({ type: POST_APILOADING, payload: false });
  }
}

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