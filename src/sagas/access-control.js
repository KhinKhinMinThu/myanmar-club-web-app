import { put, call, takeLatest } from 'redux-saga/effects';
import { api, getAuthHeader } from './api';
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
const getAccessControlData = authHeader => api.get(APIGET_ACCESS_CONTROL, authHeader);

function* asyncGetAccessControlData() {
  let errMsg;
  try {
    const authHeader = yield call(getAuthHeader);
    yield put({ type: GET_APILOADING, payload: true });
    const response = yield call(getAccessControlData, authHeader);
    if (response) {
      const { accesscontrolData, errorMsg } = response.data;
      errMsg = errorMsg;
      yield put({ type: ACCESSCONTROLDATA, payload: accesscontrolData });
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
// end

// POST REQUEST

const postAssignFunctions = (functionsAssignment, authHeader) => api.post(APIPOST_UPDATE_ACCESSCONTROL, functionsAssignment, authHeader);

const postDeleteRole = (rolesToDelete, authHeader) => api.post(APIPOST_DELETE_ROLE, rolesToDelete, authHeader);

const postNewRole = (newRoleToAdd, authHeader) => api.post(
  APIPOST_ADD_ROLE,
  {
    name: newRoleToAdd.name,
    description: newRoleToAdd.description,
    functions: newRoleToAdd.functions,
  },
  authHeader,
);
function* asyncPostProcessAccessControl(action) {
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

    if (action.type === POST_DELETEROLE) response = yield call(postDeleteRole, action.rolesToDelete, authHeader);
    if (action.type === POST_NEWROLE) response = yield call(postNewRole, action.newRoleToAdd, authHeader);
    if (action.type === POST_ASSIGNFUNCTIONS) {
      response = yield call(
        postAssignFunctions,
        action.functionsAssignment,
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
