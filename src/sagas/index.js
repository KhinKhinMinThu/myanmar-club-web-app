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
  postNewEventRSVPSaga,
} from './eventmgmt';
import {
  getMembersDataSaga,
  getMemberDataSaga,
  postDeleteMembersSaga,
  postUpdateMemberSaga,
  getMemberFormFieldsSaga,
  postUpdateMembershipAdminSaga,
  postUpdateMembershipMemberSaga,
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
    postNewEventRSVPSaga,
    // membermgmt
    getMembersDataSaga,
    getMemberDataSaga,
    postDeleteMembersSaga,
    postUpdateMemberSaga,
    getMemberFormFieldsSaga,
    postUpdateMembershipAdminSaga,
    postUpdateMembershipMemberSaga,
    // forgot-password
    postForgotPwdSaga,
    postNewEventSaga,
    postUpdateEventSaga,
  ]);
}
