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
  postSignupSaga,
} from './membermgmt';
import { getAccessControlDataSaga, postDeleteRoleSaga } from './access-control';
import postForgotPwdSaga from './forgot-password';
import { getRoleDataSaga, postAssignRolesSaga } from './rolemgmt';

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
    postSignupSaga,
    // forgot-password
    postForgotPwdSaga,
    postNewEventSaga,
    postUpdateEventSaga,
    // rolemgmt
    getRoleDataSaga,
    postAssignRolesSaga,
    // access-control
    getAccessControlDataSaga,
    postDeleteRoleSaga,
  ]);
}
