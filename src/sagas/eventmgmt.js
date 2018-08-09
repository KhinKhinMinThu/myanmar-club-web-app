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
  POST_NEWEVENT,
  POST_UPDATEEVENT,
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

const postNewEvent = newEventToAdd => api.post('/event/createEvent', {
  name: newEventToAdd.name,
  description: newEventToAdd.description,
  startDate: newEventToAdd.startDate,
  endDate: newEventToAdd.endDate,
  locationLine1: newEventToAdd.locationLine1,
  locationLine2: newEventToAdd.locationLine2,
  locationPostalCode: newEventToAdd.locationPostalCode,
  ticketFee: newEventToAdd.ticketFee,
  noOfPax: newEventToAdd.noOfPax,
  isRefreshmentProvided: newEventToAdd.isRefreshmentProvided,
  contactPerson: newEventToAdd.contactPerson,
  emailAddress: newEventToAdd.emailAddress,
  mobilePhone: newEventToAdd.mobilePhone,
  eventStatus: newEventToAdd.eventStatus,
});
const postUpdateEvent = eventToUpdate => api.post('/event/updateEvent', {
  id: eventToUpdate.id,

  name: eventToUpdate.name,
  description: eventToUpdate.description,
  startDate: eventToUpdate.startDate,
  endDate: eventToUpdate.endDate,
  locationLine1: eventToUpdate.locationLine1,
  locationLine2: eventToUpdate.locationLine2,
  locationPostalCode: eventToUpdate.locationPostalCode,
  ticketFee: eventToUpdate.ticketFee,
  noOfPax: eventToUpdate.noOfPax,
  isRefreshmentProvided: eventToUpdate.isRefreshmentProvided,
  contactPerson: eventToUpdate.contactPerson,
  emailAddress: eventToUpdate.emailAddress,
  mobilePhone: eventToUpdate.mobilePhone,
  eventStatus: eventToUpdate.eventStatus,
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
      action.newEventToAdd,
      action.eventToUpdate,
    );

    if (action.type === POST_DELETEEVENT) yield call(postDeleteEvent, action.eventsToDelete);
    if (action.type === POST_DELETERSVP) yield call(postDeleteRSVP, action.eventRSVPToDelete);
    if (action.type === POST_NEWEVENT) yield call(postNewEvent, action.newEventToAdd);
    if (action.type === POST_UPDATEEVENT) yield call(postUpdateEvent, action.eventToUpdate);

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
export const postNewEventSaga = takeLatest(
  POST_NEWEVENT,
  asyncPostProcessEvents,
);
export const postUpdateEventSaga = takeLatest(
  POST_UPDATEEVENT,
  asyncPostProcessEvents,
);
