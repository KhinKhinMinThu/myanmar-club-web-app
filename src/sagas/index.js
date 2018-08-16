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
  getEventDataSaga,
  getEventsDataSaga,
  postDeleteEventSaga,
  postDeleteRSVPSaga,
  postNewEventSaga,
  postUpdateEventSaga,
  postNotifyEventSaga,
} from './eventmgmt';
import {
  getMembersDataSaga,
  getMemberDataSaga,
  postDeleteMembersSaga,
  postUpdateMemberSaga,
  getMemberFormFieldsSaga,
  postUpdateMembershipAdminSaga,
  postUpdateMembershipMemberSaga,
  postSignupSaga,
} from './membermgmt';
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
    getEventDataSaga,
    getEventsDataSaga,
    postDeleteEventSaga,
    postDeleteRSVPSaga,
    postNotifyEventSaga,
    // membermgmt
    getMembersDataSaga,
    getMemberDataSaga,
    postDeleteMembersSaga,
    postUpdateMemberSaga,
    getMemberFormFieldsSaga,
    postUpdateMembershipAdminSaga,
    postUpdateMembershipMemberSaga,
    postSignupSaga,
    // forgot-password
    postForgotPwdSaga,
    postNewEventSaga,
    postUpdateEventSaga,
  ]);
}
