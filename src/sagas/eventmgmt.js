import { put, call, takeLatest } from 'redux-saga/effects';
import {
  api,
  apiMultiPart,
  getAuthHeader,
  getAuthMultiPartHeader,
} from './api';
import {
  GET_EVENTSDATA,
  GET_EVENTDATA,
  GET_APILOADING,
  EVENTDATA,
  EVENTSDATA,
  PENDINGCLAIMS,
  GET_ERROR,
  POST_APILOADING,
  POST_DELETEEVENT,
  POST_DELETERSVP,
  POST_NEWEVENT,
  POST_NEWEVENTRSVP,
  POST_UPDATEEVENT,
  POST_NOTIFYEVENT,
  POST_UPDATEREGPAYMENT,
  POST_DOWNLOAD_REGISTRATIONS,
  POST_PENDING_CLAIMS,
  POST_ERROR,
} from '../reducers/eventmgmt/eventmgmt-data';
import {
  APIGET_EVENTSDATA,
  APIGET_EVENTDATA,
  APIPOST_DELETE_EVENT,
  APIPOST_DELETE_EVENT_RSVP,
  APIPOST_UPDATE_EVENT,
  APIPOST_ADD_EVENT,
  APIPOST_ADD_EVENT_RSVP,
  APIPOST_ADD_EVENTPHOTO,
  APIPOST_NOTIFY_EVENT,
  APIPOST_UPDATE_REGPAYMENT,
  APIPOST_DOWNLOAD_REGISTRATIONGS,
  APIPOST_PENDING_CLAIMS,
} from '../actions/constants';

// GET REQUEST
const getEventsData = authHeader => api.get(APIGET_EVENTSDATA, authHeader);
// POST TO GET DATA -.-
const getEventData = (id, authHeader) => api.post(APIGET_EVENTDATA, id, authHeader);
function* asyncGetEventData(action) {
  let errMsg;
  try {
    const authHeader = yield call(getAuthHeader);
    yield put({ type: GET_APILOADING, payload: true });
    const response = yield call(getEventData, action.id, authHeader);
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
    const authHeader = yield call(getAuthHeader);
    yield put({ type: GET_APILOADING, payload: true });
    const response = yield call(getEventsData, authHeader);
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
const postDeleteEvent = (eventsToDelete, authHeader) => api.post(APIPOST_DELETE_EVENT, eventsToDelete, authHeader);

const postDeleteRSVP = (eventRSVPToDelete, authHeader) => api.post(APIPOST_DELETE_EVENT_RSVP, eventRSVPToDelete, authHeader);

// not posting with api.post(APIPOST_ADD_EVENT, { newEvenToAdd });
// in order to filter uncessary data
const postNewEvent = (newEventToAdd, authHeader) => api.post(
  APIPOST_ADD_EVENT,
  {
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
  },
  authHeader,
);

const postNewEventRSVP = (newEventRSVPToAdd, authHeader) => api.post(
  APIPOST_ADD_EVENT_RSVP,
  {
    eventID: newEventRSVPToAdd.id,
    name: newEventRSVPToAdd.memberName,
    emailAddress: newEventRSVPToAdd.memberEmailAddress,
    mobilePhone: newEventRSVPToAdd.memberMobilePhone,
    noOfPax: newEventRSVPToAdd.memberNoOfPax,
    paymentType: newEventRSVPToAdd.paymentType,
  },
  authHeader,
);

const postUpdateEvent = (eventToUpdate, authHeader) => api.post(
  APIPOST_UPDATE_EVENT,
  {
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
  },
  authHeader,
);

const postEventPhoto = (multipartForm, authMultiPartHeader) => apiMultiPart.post(APIPOST_ADD_EVENTPHOTO, multipartForm, authMultiPartHeader);

const postNotifyEvent = (notification, authHeader) => api.post(
  APIPOST_NOTIFY_EVENT,
  {
    id: notification.id,
    url: notification.url,
  },
  authHeader,
);

const postUpdateRegPayment = (eventRSVPPayment, authHeader) => api.post(APIPOST_UPDATE_REGPAYMENT, eventRSVPPayment, authHeader);

const assembleFormData = ({ eventId, imageFile }) => {
  if (eventId && imageFile) {
    const mpf = new FormData();
    mpf.append('id', eventId);
    mpf.append('eventPhoto', imageFile, imageFile.name);

    // Object.entries(mpf).forEach(item => console.log('>>>>', item));

    return mpf;
  }
  return null;
};

const postDownloadReg = (eventId, authHeader) => api.post(APIPOST_DOWNLOAD_REGISTRATIONGS, { id: eventId }, authHeader);
const postPendingClaims = (eventId, authHeader) => api.post(APIPOST_PENDING_CLAIMS, { eventId }, authHeader);
function* asyncPostProcessEvents(action) {
  let errMsg;
  try {
    const authHeader = yield call(getAuthHeader);
    const authMultiPartHeader = yield call(getAuthMultiPartHeader);
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
      action.eventRSVPPayment,
      action.eventId,
    );

    let multipartForm;
    const eventData = action.newEventToAdd || action.eventToUpdate;

    switch (action.type) {
      case POST_DELETEEVENT:
        response = yield call(
          postDeleteEvent,
          action.eventsToDelete,
          authHeader,
        );
        break;
      case POST_DELETERSVP:
        response = yield call(
          postDeleteRSVP,
          action.eventRSVPToDelete,
          authHeader,
        );
        break;
      case POST_NEWEVENTRSVP:
        response = yield call(
          postNewEventRSVP,
          action.newEventRSVPToAdd,
          authHeader,
        );
        break;
      case POST_NEWEVENT:
        response = yield call(postNewEvent, action.newEventToAdd, authHeader);
        multipartForm = assembleFormData({
          eventId: response.data.id,
          imageFile: eventData.uploadBtn[0],
        });
        console.log('eventId', response.data.id, 'mpf', multipartForm);
        if (multipartForm) {
          response = yield call(
            postEventPhoto,
            multipartForm,
            authMultiPartHeader,
          );
        }
        break;
      case POST_UPDATEEVENT:
        response = yield call(
          postUpdateEvent,
          action.eventToUpdate,
          authHeader,
        );
        multipartForm = assembleFormData({
          eventId: eventData.id,
          imageFile: eventData.uploadBtn[0],
        });
        console.log('eventId', eventData.id, 'mpf', multipartForm);
        if (multipartForm) {
          response = yield call(
            postEventPhoto,
            multipartForm,
            authMultiPartHeader,
          );
        }

        break;
      case POST_NOTIFYEVENT:
        response = yield call(postNotifyEvent, action.notification, authHeader);
        break;
      case POST_UPDATEREGPAYMENT:
        response = yield call(
          postUpdateRegPayment,
          action.eventRSVPPayment,
          authHeader,
        );
        break;
      case POST_DOWNLOAD_REGISTRATIONS:
        response = yield call(postDownloadReg, action.eventId, authHeader);
        break;
      case POST_PENDING_CLAIMS:
        response = yield call(postPendingClaims, action.eventId, authHeader);
        if (response.data.hasClaims) {
          yield put({ type: PENDINGCLAIMS, payload: response.data.hasClaims });
          // yield put({ type: PENDINGCLAIMS, payload: '1' });
        }
        break;
      default:
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
export const postUpdateRegPaymentSaga = takeLatest(
  POST_UPDATEREGPAYMENT,
  asyncPostProcessEvents,
);
export const postDownloadRegSaga = takeLatest(
  POST_DOWNLOAD_REGISTRATIONS,
  asyncPostProcessEvents,
);
export const postPendingClaimsSaga = takeLatest(
  POST_PENDING_CLAIMS,
  asyncPostProcessEvents,
);
