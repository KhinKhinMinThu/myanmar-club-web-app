import { put, call, takeLatest } from 'redux-saga/effects';
import { api, apiMultiPart } from './api';
import {
  GET_EVENTSDATA,
  GET_EVENTDATA,
  GET_APILOADING,
  EVENTDATA,
  EVENTSDATA,
  GET_ERROR,
  POST_APILOADING,
  POST_DELETEEVENT,
  POST_DELETERSVP,
  POST_NEWEVENT,
  POST_UPDATEEVENT,
  POST_NOTIFYEVENT,
  POST_ERROR,
} from '../reducers/eventmgmt/eventmgmt-data';
import {
  APIGET_EVENTSDATA,
  APIGET_EVENTDATA,
  APIPOST_DELETE_EVENT,
  APIPOST_DELETE_EVENT_RSVP,
  APIPOST_UPDATE_EVENT,
  APIPOST_ADD_EVENT,
  APIPOST_ADD_EVENTPHOTO,
  APIPOST_NOTIFY_EVENT,
} from '../actions/constants';

// GET REQUEST
const getEventsData = () => api.get(APIGET_EVENTSDATA);
// POST TO GET DATA -.-
const getEventData = id => api.post(APIGET_EVENTDATA, id);
function* asyncGetEventData(action) {
  let errMsg;
  try {
    yield put({ type: GET_APILOADING, payload: true });
    const response = yield call(getEventData, action.id);
    const { eventData, errorMsg } = response.data;
    errMsg = errorMsg;

    yield put({ type: EVENTDATA, payload: eventData });
  } catch (e) {
    errMsg = e.message;
  } finally {
    yield put({ type: GET_ERROR, payload: errMsg });
    yield put({ type: GET_APILOADING, payload: false });
  }
}

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
// end

// POST REQUEST
const postDeleteEvent = eventsToDelete => api.post(APIPOST_DELETE_EVENT, eventsToDelete);

const postDeleteRSVP = eventRSVPToDelete => api.post(APIPOST_DELETE_EVENT_RSVP, eventRSVPToDelete);

const postNewEvent = newEventToAdd => api.post(APIPOST_ADD_EVENT, {
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

const postUpdateEvent = eventToUpdate => api.post(APIPOST_UPDATE_EVENT, {
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

const postEventPhoto = multipartForm => apiMultiPart.post(APIPOST_ADD_EVENTPHOTO, multipartForm);

const postNotifyEvent = notification => api.post(APIPOST_NOTIFY_EVENT, {
  id: notification.id,
  url: notification.url,
});

const assembleFormData = ({ eventId, imageFile }) => {
  if (eventId && imageFile) {
    console.log('assembleForm', eventId, imageFile);
    const mpf = new FormData();
    mpf.append('id', eventId.id);
    mpf.append('eventPhoto', imageFile, imageFile.name);
    return mpf;
  }
  return null;
};

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
      action.notification,
    );

    let multipartForm;
    const eventData = action.newEventToAdd || action.eventToUpdate;

    switch (action.type) {
      case POST_DELETEEVENT:
        response = yield call(postDeleteEvent, action.eventsToDelete);
        break;
      case POST_DELETERSVP:
        response = yield call(postDeleteRSVP, action.eventRSVPToDelete);
        break;
      case POST_NEWEVENT:
        response = yield call(postNewEvent, action.newEventToAdd);
        multipartForm = assembleFormData({
          eventId: response.data.id,
          imageFile: eventData.uploadBtn[0],
        });
        console.log('eventId', response.data.id, 'mpf', multipartForm);
        if (multipartForm) response = yield call(postEventPhoto, multipartForm);
        break;
      case POST_UPDATEEVENT:
        response = yield call(postUpdateEvent, action.eventToUpdate);
        multipartForm = assembleFormData({
          eventId: eventData.id,
          imageFile: eventData.uploadBtn[0],
        });
        console.log('eventId', eventData.id, 'mpf', multipartForm);
        if (multipartForm) response = yield call(postEventPhoto, multipartForm);

        break;
      case POST_NOTIFYEVENT:
        response = yield call(postNotifyEvent, action.notification);
        break;
      default:
    }
    // console.log('eventId', eventId, 'mpf', multipartForm);
    // if (multipartForm) response = yield call(postEventPhoto, multipartForm);

    const { errorMsg } = response.data;
    errMsg = errorMsg;

    console.log('API RESPONSE.........', response.data);
  } catch (e) {
    errMsg = e.message;
  } finally {
    yield put({ type: POST_ERROR, payload: errMsg });
    yield put({ type: POST_APILOADING, payload: false });
  }
}
// end

export const getEventsDataSaga = takeLatest(GET_EVENTSDATA, asyncGetEventsData);
export const getEventDataSaga = takeLatest(GET_EVENTDATA, asyncGetEventData);

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
export const postNotifyEventSaga = takeLatest(
  POST_NOTIFYEVENT,
  asyncPostProcessEvents,
);
