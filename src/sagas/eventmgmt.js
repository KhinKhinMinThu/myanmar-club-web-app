import { put, call, takeLatest } from 'redux-saga/effects';
import { api, apiMultiPart } from './api';
import {
  GET_EVENTSDATA,
  GET_APILOADING,
  EVENTSDATA,
  GET_ERROR,
  POST_APILOADING,
  POST_DELETEEVENT,
  POST_DELETERSVP,
  POST_NEWEVENT,
  POST_NEWEVENTRSVP,
  POST_UPDATEEVENT,
  POST_NOTIFYEVENT,
  POST_ERROR,
} from '../reducers/eventmgmt/eventmgmt-data';
import {
  APIGET_EVENTSDATA,
  APIPOST_DELETE_EVENT,
  APIPOST_DELETE_EVENT_RSVP,
  APIPOST_UPDATE_EVENT,
  APIPOST_ADD_EVENT,
  APIPOST_ADD_EVENT_RSVP,
  APIPOST_ADD_EVENTPHOTO,
  APIPOST_NOTIFY_EVENT,
} from '../actions/constants';

// GET REQUEST
const getEventsData = () => api.get(APIGET_EVENTSDATA);

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

const postNewEventRSVP = newEventRSVPToAdd => api.post(APIPOST_ADD_EVENT_RSVP, {
  eventID: newEventRSVPToAdd.id,
  name: newEventRSVPToAdd.memberName,
  emailAddress: newEventRSVPToAdd.memberEmailAddress,
  mobilePhone: newEventRSVPToAdd.memberMobilePhone,
  noOfPax: newEventRSVPToAdd.memberNoOfPax,
  paymentType: newEventRSVPToAdd.paymentType,
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
      action.newEventRSVPToAdd,
    );

    let id;
    let multipartForm;
    const eventData = action.newEventToAdd || action.eventToUpdate;

    switch (action.type) {
      case POST_DELETEEVENT:
        response = yield call(postDeleteEvent, action.eventsToDelete);
        break;
      case POST_DELETERSVP:
        response = yield call(postDeleteRSVP, action.eventRSVPToDelete);
        break;
      case POST_NEWEVENTRSVP:
        response = yield call(postNewEventRSVP, action.newEventRSVPToAdd);
        break;
      case POST_NEWEVENT:
        response = yield call(postNewEvent, action.newEventToAdd);
        id = response.data;
        multipartForm = assembleFormData({
          eventId: id,
          imageFile: eventData.uploadBtn[0],
        });
        break;
      case POST_UPDATEEVENT:
        response = yield call(postUpdateEvent, action.eventToUpdate);
        if (!response.data.errorMsg) id = eventData;
        break;
      case POST_NOTIFYEVENT:
        response = yield call(postNotifyEvent, action.notification);
        break;
      default:
    }
    console.log('id', id, 'mpf', multipartForm);
    if (multipartForm) response = yield call(postEventPhoto, multipartForm);

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
export const postNewEventRSVPSaga = takeLatest(
  POST_NEWEVENTRSVP,
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
