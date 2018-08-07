import { put, call, takeLatest } from 'redux-saga/effects';
import api from './api';
import {
  GET_EVENTTRANSACDATA,
  GET_APILOADING,
  EVENTTRANSACDATA,
  GET_ERROR,
  // POST_APILOADING,
  // POST_DELETETRANCS,
  // POST_ADDTRANCS,
  // POST_ERROR,
} from '../reducers/event-transaction/event-transaction-data';

const getEventTranscData = () => api.get('/getEventsTranscData');

function* asyncGetEventTranscData() {
  let errMsg;
  try {
    yield put({ type: GET_APILOADING, payload: true });
    const response = yield call(getEventTranscData);
    const { eventsData, errorMsg } = response.data;
    errMsg = errorMsg;
    yield put({ type: EVENTTRANSACDATA, payload: eventsData });
  } catch (e) {
    errMsg = e.message;
  } finally {
    yield put({ type: GET_ERROR, payload: errMsg });
    yield put({ type: GET_APILOADING, payload: false });
  }
}

// const postApproveClaims = claimsToApprove => api.post('/approveClaims', claimsToApprove);

// const postUnapproveClaims = claimsToUnapprove => api.post('/unapproveClaims', claimsToUnapprove);

// function* asyncPostProcessClaims(action) {
//   let errMsg;
//   try {
//     yield put({ type: POST_APILOADING, payload: true });
//     let response;

//     console.log(
//       'Calling API.........',
//       action.type,
//       action.claimsToApprove,
//       action.claimsToUnapprove,
//     );

//     if (action.type === POST_APPROVECLAIMS) response = yield call(postApproveClaims, action.claimsToApprove);
//     if (action.type === POST_UNAPPROVECLAIMS) response = yield call(postUnapproveClaims, action.claimsToUnapprove);
//     const { errorMsg } = response.data;
//     errMsg = errorMsg;
//   } catch (e) {
//     errMsg = e.message;
//   } finally {
//     yield put({ type: POST_ERROR, payload: errMsg });
//     yield put({ type: POST_APILOADING, payload: false });
//   }
// }

export const getEventTranscDataSaga = takeLatest(
  GET_EVENTTRANSACDATA,
  asyncGetEventTranscData,
);
export const a = 0;
// export const postApproveClaimsSaga = takeLatest(
//   POST_APPROVECLAIMS,
//   asyncPostProcessClaims,
// );
// export const postUnapproveClaimsSaga = takeLatest(
//   POST_UNAPPROVECLAIMS,
//   asyncPostProcessClaims,
// );
