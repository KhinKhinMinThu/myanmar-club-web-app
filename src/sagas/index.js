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
  ]);
}
