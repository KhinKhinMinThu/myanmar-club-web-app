import { all } from 'redux-saga/effects';
import loginSaga from './login';
import {
  getClaimsDataSaga,
  postApproveClaimsSaga,
  postUnapproveClaimsSaga,
} from './claimmgmt';
import {
  getEventTranscDataSaga,
  postDeleteTranscSaga,
  postAddTranscSaga,
} from './event-transaction';
import {
  getEventsDataSaga,
  postDeleteEventSaga,
  postDeleteRSVPSaga,
  postNewEventSaga,
  postUpdateEventSaga,
} from './eventmgmt';
import postForgotPwdSaga from './forgot-password';

export default function* rootSaga() {
  yield all([
    loginSaga,
    // claimmgmt
    getClaimsDataSaga,
    postApproveClaimsSaga,
    postUnapproveClaimsSaga,
    // event-transaction
    getEventTranscDataSaga,
    postDeleteTranscSaga,
    postAddTranscSaga,
    // eventmgmt
    getEventsDataSaga,
    postDeleteEventSaga,
    postDeleteRSVPSaga,
    // forgot-password
    postForgotPwdSaga,
    postNewEventSaga,
    postUpdateEventSaga,
  ]);
}
