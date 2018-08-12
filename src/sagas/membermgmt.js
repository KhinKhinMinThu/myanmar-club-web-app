import { put, call, takeLatest } from 'redux-saga/effects';
import { api } from './api';
import {
  GET_MEMBERSDATA,
  GET_APILOADING,
  ECMEMBERSDATA,
  CLUBMEMBERSDATA,
  GET_ERROR,
  POST_APILOADING,
  POST_DELETEMEMBERS,
  POST_ERROR,
} from '../reducers/membermgmt/membermgmt-data';
import {
  APIGET_MEMBERSDATA,
  APIPOST_DELETE_MEMBERS,
} from '../actions/constants';

// GET REQUEST
const getMembersData = () => api.get(APIGET_MEMBERSDATA);

function* asyncGetMembersData() {
  let errMsg;
  try {
    yield put({ type: GET_APILOADING, payload: true });
    const response = yield call(getMembersData);
    const { membersData, errorMsg } = response.data;
    errMsg = errorMsg;
    const ecMembersList = membersData.filter(item => item.isEcMember === '1');
    const clubMembersList = membersData.filter(item => item.isEcMember === '0');

    yield put({ type: ECMEMBERSDATA, payload: ecMembersList });
    yield put({ type: CLUBMEMBERSDATA, payload: clubMembersList });
  } catch (e) {
    errMsg = e.message;
  } finally {
    yield put({ type: GET_ERROR, payload: errMsg });
    yield put({ type: GET_APILOADING, payload: false });
  }
}
// end

// POST REQUEST
const postDeleteMembers = membersToDelete => api.post(APIPOST_DELETE_MEMBERS, membersToDelete);

function* asyncPostProcessMembers(action) {
  let errMsg;
  try {
    yield put({ type: POST_APILOADING, payload: true });
    let response;

    console.log('Calling API.........', action.type, action.membersToDelete);

    if (action.type === POST_DELETEMEMBERS) response = yield call(postDeleteMembers, action.membersToDelete);

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

export const getMembersDataSaga = takeLatest(
  GET_MEMBERSDATA,
  asyncGetMembersData,
);

export const postDeleteMembersSaga = takeLatest(
  POST_DELETEMEMBERS,
  asyncPostProcessMembers,
);
