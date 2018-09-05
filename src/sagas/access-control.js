import { put, call, takeLatest } from 'redux-saga/effects';
import { api } from './api';
import {
  GET_ACCESSCONTROLDATA,
  GET_APILOADING,
  ACCESSCONTROLDATA,
  GET_ERROR,
  POST_APILOADING,
  POST_DELETEROLE,
  POST_ADDTRANSC,
  POST_ERROR,
} from '../reducers/access-control/access-control-data';
import {
  APIGET_ACCESS_CONTROL,
  APIPOST_ADD_EVENTTRANSC,
  APIPOST_DELETE_ROLE,
} from '../actions/constants';

// GET REQUEST
const getAccessControlData = () => api.get(APIGET_ACCESS_CONTROL);

function* asyncGetAccessControlData() {
  let errMsg;
  try {
    yield put({ type: GET_APILOADING, payload: true });
    const response = yield call(getAccessControlData);
    const { accesscontrolData, errorMsg } = response.data;
    errMsg = errorMsg;
    yield put({ type: ACCESSCONTROLDATA, payload: accesscontrolData });

    console.log('API RESPONSE.........', response);
  } catch (e) {
    errMsg = e.message;
  } finally {
    yield put({ type: GET_ERROR, payload: errMsg });
    yield put({ type: GET_APILOADING, payload: false });
  }
}
// end

// POST REQUEST

const postDeleteRole = rolesToDelete => api.post(APIPOST_DELETE_ROLE, rolesToDelete);

const postAddEventTransc = eventTranscToAdd => api.post(APIPOST_ADD_EVENTTRANSC, {
  eventId: eventTranscToAdd.eventId,
  transacDataToAdd: eventTranscToAdd.transacDataToAdd,
});

function* asyncPostProcessAccessControl(action) {
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

    if (action.type === POST_DELETEROLE) response = yield call(postDeleteRole, action.eventsToDelete);
    if (action.type === POST_ADDTRANSC) response = yield call(postAddEventTransc, action.eventTranscToAdd);

    const { errorMsg } = response.data;
    errMsg = errorMsg;

    console.log('API RESPONSE.........', response);
  } catch (e) {
    errMsg = e.message;
  } finally {
    yield put({ type: POST_ERROR, payload: errMsg });
    yield put({ type: POST_APILOADING, payload: false });
  }
}
// end

export const getAccessControlDataSaga = takeLatest(
  GET_ACCESSCONTROLDATA,
  asyncGetAccessControlData,
);

export const postAddTranscSaga = takeLatest(
  POST_ADDTRANSC,
  asyncPostProcessAccessControl,
);

export const postDeleteRoleSaga = takeLatest(
  POST_DELETEROLE,
  asyncPostProcessAccessControl,
);
