import { put, call, takeLatest } from 'redux-saga/effects';
import api from './api';
import {
  GET_CLAIMSDATA,
  APILOADING,
  NEWCLAIMSDATA,
  OLDCLAIMSDATA,
  GET_ERROR,
  POST_APILOADING,
  POST_APPROVECLAIMS,
  POST_UNAPPROVECLAIMS,
  POST_ERROR,
} from '../reducers/claimmgmt/claimmgmt-data';

const getClaimsData = () => api.get('/getClaimsData');

function* asyncGetClaimsData() {
  let errMsg;
  try {
    yield put({ type: APILOADING, payload: true });
    const response = yield call(getClaimsData);
    const { claimsData, errorMsg } = response.data;
    errMsg = errorMsg;
    const newClaimsList = claimsData.filter(item => item.isApproved === '0');
    const oldClaimsList = claimsData.filter(item => item.isApproved === '1');

    yield put({ type: NEWCLAIMSDATA, payload: newClaimsList });
    yield put({ type: OLDCLAIMSDATA, payload: oldClaimsList });
  } catch (e) {
    errMsg = e.message;
  } finally {
    yield put({ type: GET_ERROR, payload: errMsg });
    yield put({ type: APILOADING, payload: false });
  }
}

const postApproveClaims = claimsToApprove => api.post('/approveClaims', claimsToApprove);

const postUnapproveClaims = claimsToUnApprove => api.post('/unapproveClaims', claimsToUnApprove);

function* asyncPostProcessClaims(action) {
  let errMsg;
  try {
    yield put({ type: POST_APILOADING, payload: true });
    let response;

    console.log(
      'Calling API.........',
      action.type,
      action.claimsToApprove,
      action.claimsToUnApprove,
    );

    if (action.type === POST_APPROVECLAIMS) response = yield call(postApproveClaims, action.claimsToApprove);
    if (action.type === POST_UNAPPROVECLAIMS) response = yield call(postUnapproveClaims, action.claimsToUnApprove);
    const { errorMsg } = response.data;
    errMsg = errorMsg;
  } catch (e) {
    errMsg = e.message;
  } finally {
    yield put({ type: POST_ERROR, payload: errMsg });
    yield put({ type: POST_APILOADING, payload: false });
  }
}

export const getClaimsDataSaga = takeLatest(GET_CLAIMSDATA, asyncGetClaimsData);
export const postApproveClaimsSaga = takeLatest(
  POST_APPROVECLAIMS,
  asyncPostProcessClaims,
);
export const postUnapproveClaimsSaga = takeLatest(
  POST_UNAPPROVECLAIMS,
  asyncPostProcessClaims,
);
