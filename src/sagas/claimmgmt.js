import { put, call, takeLatest } from 'redux-saga/effects';
import { api, getAuthHeader } from './api';
import {
  GET_CLAIMSDATA,
  GET_APILOADING,
  NEWCLAIMSDATA,
  OLDCLAIMSDATA,
  GET_ERROR,
  POST_APILOADING,
  POST_APPROVECLAIMS,
  POST_UNAPPROVECLAIMS,
  POST_ERROR,
} from '../reducers/claimmgmt/claimmgmt-data';
import {
  APIGET_CLAIMSDATA,
  APIPOST_APPROVE_CLAIMS,
  APIPOST_UNAPPROVE_CLAIMS,
} from '../actions/constants';

// GET REQUEST
const getClaimsData = authHeader => api.get(APIGET_CLAIMSDATA, authHeader);

function* asyncGetClaimsData() {
  let errMsg;
  try {
    const authHeader = yield call(getAuthHeader);
    yield put({ type: GET_APILOADING, payload: true });
    const response = yield call(getClaimsData, authHeader);
    const { claimsData, errorMsg } = response.data;
    errMsg = errorMsg;
    if (claimsData) {
      const newClaimsList = claimsData.filter(item => item.isApproved === '0');
      const oldClaimsList = claimsData.filter(item => item.isApproved === '1');

      yield put({ type: NEWCLAIMSDATA, payload: newClaimsList });
      yield put({ type: OLDCLAIMSDATA, payload: oldClaimsList });
    }
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
const postApproveClaims = (claimsToApprove, authHeader) => api.post(APIPOST_APPROVE_CLAIMS, claimsToApprove, authHeader);

// name must Ae claimsToUnApprove with capital A
const postUnapproveClaims = (claimsToUnApprove, authHeader) => api.post(APIPOST_UNAPPROVE_CLAIMS, claimsToUnApprove, authHeader);

function* asyncPostProcessClaims(action) {
  let errMsg;
  try {
    const authHeader = yield call(getAuthHeader);
    yield put({ type: POST_APILOADING, payload: true });
    let response;

    console.log(
      'Calling API.........',
      action.type,
      action.claimsToApprove,
      action.claimsToUnApprove,
    );

    if (action.type === POST_APPROVECLAIMS) {
      response = yield call(
        postApproveClaims,
        action.claimsToApprove,
        authHeader,
      );
    }
    if (action.type === POST_UNAPPROVECLAIMS) {
      response = yield call(
        postUnapproveClaims,
        action.claimsToUnApprove,
        authHeader,
      );
    }
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

export const getClaimsDataSaga = takeLatest(GET_CLAIMSDATA, asyncGetClaimsData);
export const postApproveClaimsSaga = takeLatest(
  POST_APPROVECLAIMS,
  asyncPostProcessClaims,
);
export const postUnapproveClaimsSaga = takeLatest(
  POST_UNAPPROVECLAIMS,
  asyncPostProcessClaims,
);
