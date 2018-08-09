import { put, call, takeLatest } from 'redux-saga/effects';
import api from './api';
import {
  GET_EVENTSDATA,
  GET_APILOADING,
  EVENTSDATA,
  GET_ERROR,
  POST_APILOADING,
  POST_DELETEEVENT,
  POST_DELETERSVP,
  POST_ERROR,
} from '../reducers/eventmgmt/eventmgmt-data';

const getEventsData = () => api.get('/event/getEventsData');

function* asyncGetEventsData() {
  let errMsg;
  try {
    yield put({ type: GET_APILOADING, payload: true });
    const response = yield call(getEventsData);
    const { eventsData, errorMsg } = response.data;
    errMsg = errorMsg;
    yield put({ type: EVENTSDATA, payload: eventsData });
  } catch (e) {
    errMsg = e.message;
  } finally {
    yield put({ type: GET_ERROR, payload: errMsg });
    yield put({ type: GET_APILOADING, payload: false });
  }
}

const postDeleteEvent = eventsToDelete => api.post('/event/deleteEvent', {
  eventsToDelete,
});

const postDeleteRSVP = eventRSVPToDelete => api.post('/event/deleteRegistrations', {
  eventRSVPToDelete,
});

function* asyncPostProcessEvents(action) {
  let errMsg;
  try {
    yield put({ type: POST_APILOADING, payload: true });
    let response;

    console.log(
      'Calling API.........',
      action.type,
      action.eventsToDelete,
      action.eventRSVPToDelete,
    );

    if (action.type === POST_DELETEEVENT) yield call(postDeleteEvent, action.eventsToDelete);
    if (action.type === POST_DELETERSVP) yield call(postDeleteRSVP, action.eventRSVPToDelete);

    const { errorMsg } = response.data;
    errMsg = errorMsg;
  } catch (e) {
    errMsg = e.message;
  } finally {
    yield put({ type: POST_ERROR, payload: errMsg });
    yield put({ type: POST_APILOADING, payload: false });
  }
}

export const getEventsDataSaga = takeLatest(GET_EVENTSDATA, asyncGetEventsData);
export const postDeleteEventSaga = takeLatest(
  POST_DELETEEVENT,
  asyncPostProcessEvents,
);
export const postDeleteRSVPSaga = takeLatest(
  POST_DELETERSVP,
  asyncPostProcessEvents,
);
