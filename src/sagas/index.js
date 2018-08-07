import { all } from 'redux-saga/effects';
import loginSaga from './login';
import {
  getClaimsDataSaga,
  postApproveClaimsSaga,
  postUnapproveClaimsSaga,
} from './claimmgmt';

export default function* rootSaga() {
  yield all([
    loginSaga,
    getClaimsDataSaga,
    postApproveClaimsSaga,
    postUnapproveClaimsSaga,
  ]);
}
