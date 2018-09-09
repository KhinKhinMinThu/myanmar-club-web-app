import { put, call, takeLatest } from 'redux-saga/effects';
import { api } from './api';
import {
  GET_ACCESSCONTROLDATA,
  GET_APILOADING,
  ACCESSCONTROLDATA,
  GET_ERROR,
  POST_APILOADING,
  POST_DELETEROLE,
  POST_ERROR,
  POST_NEWROLE,
  POST_ASSIGNFUNCTIONS,
} from '../reducers/access-control/access-control-data';
import {
  APIGET_ACCESS_CONTROL,
  APIPOST_DELETE_ROLE,
  APIPOST_ADD_ROLE,
  APIPOST_UPDATE_ACCESSCONTROL,
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

const postAssignFunctions = functionsAssignment => api.post(APIPOST_UPDATE_ACCESSCONTROL, functionsAssignment);

const postDeleteRole = rolesToDelete => api.post(APIPOST_DELETE_ROLE, rolesToDelete);

const postNewRole = newRoleToAdd => api.post(APIPOST_ADD_ROLE, {
  name: newRoleToAdd.name,
  description: newRoleToAdd.description,
  functions: newRoleToAdd.functions,
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

    if (action.type === POST_DELETEROLE) response = yield call(postDeleteRole, action.rolesToDelete);
    if (action.type === POST_NEWROLE) response = yield call(postNewRole, action.newRoleToAdd);
    if (action.type === POST_ASSIGNFUNCTIONS) response = yield call(postAssignFunctions, action.functionsAssignment);
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

export const postDeleteRoleSaga = takeLatest(
  POST_DELETEROLE,
  asyncPostProcessAccessControl,
);

export const postAddRoleSaga = takeLatest(
  POST_NEWROLE,
  asyncPostProcessAccessControl,
);

export const postAssignFunctionsSaga = takeLatest(
  POST_ASSIGNFUNCTIONS,
  asyncPostProcessAccessControl,
);
