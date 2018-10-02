import { put, call, takeLatest } from 'redux-saga/effects';
import { api, getAuthHeader } from './api';
import {
  GET_ROLEDATA,
  ROLEDATA,
  ROLENAMELIST,
  ALLECLIST,
  GET_APILOADING,
  GET_ERROR,
  POST_APILOADING,
  POST_ASSIGNROLES,
  POST_ERROR,
} from '../reducers/rolemgmt/rolemgmt-data';
import { APIGET_ROLEDATA, APIPOST_ASSIGN_ROLES } from '../actions/constants';

// GET REQUEST
const getRoleData = authHeader => api.get(APIGET_ROLEDATA, authHeader);
function* asyncGetRoleData() {
  let errMsg;
  try {
    const authHeader = yield call(getAuthHeader);
    yield put({ type: GET_APILOADING, payload: true });
    const response = yield call(getRoleData, authHeader);
    if (response) {
      const { roleData, errorMsg } = response.data;
      errMsg = errorMsg;
      if (roleData) {
        const roleNameList = [];
        roleData
          .filter(item => item.roleId > 0)
          .map(item => roleNameList.push({ id: item.roleId, name: item.roleName }));

        const allEcList = roleData
          ? roleData.find(item => item.roleId === 0).ecMembers
          : [];

        yield put({ type: ROLEDATA, payload: roleData });
        yield put({ type: ROLENAMELIST, payload: roleNameList });
        yield put({ type: ALLECLIST, payload: allEcList });
      }
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
const postAssignRoles = (rolesAssignmnet, authHeader) => api.post(APIPOST_ASSIGN_ROLES, rolesAssignmnet, authHeader);

function* asyncPostProcessRoles(action) {
  let errMsg;
  try {
    const authHeader = yield call(getAuthHeader);
    yield put({ type: POST_APILOADING, payload: true });
    let response;

    console.log('Calling API.........', action.type, action.rolesAssignment);

    switch (action.type) {
      case POST_ASSIGNROLES:
        response = yield call(
          postAssignRoles,
          action.rolesAssignment,
          authHeader,
        );
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

export const getRoleDataSaga = takeLatest(GET_ROLEDATA, asyncGetRoleData);
export const postAssignRolesSaga = takeLatest(
  POST_ASSIGNROLES,
  asyncPostProcessRoles,
);
