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
  postUpdateRegPaymentSaga,
  postPendingClaimsSaga,
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
  postCheckEmailSaga,
} from './membermgmt';
import {
  getAccessControlDataSaga,
  postDeleteRoleSaga,
  postAddRoleSaga,
  postAssignFunctionsSaga,
} from './access-control';
import postForgotPwdSaga from './forgot-password';
import { getRoleDataSaga, postAssignRolesSaga } from './rolemgmt';
import {
  getSearchParamSaga,
  postSearchIncidentSaga,
  postDeleteIncidentsSaga,
  postNewIncidentSaga,
  getIncidentSaga,
  postUpdateIncidentSaga,
} from './incidentmgmt';
import getChartsDataSaga from './charts';

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
    postUpdateRegPaymentSaga,

    postPendingClaimsSaga,
    // membermgmt
    getMembersDataSaga,
    getMemberDataSaga,
    postDeleteMembersSaga,
    postUpdateMemberSaga,
    getMemberFormFieldsSaga,
    postUpdateMembershipAdminSaga,
    postUpdateMembershipMemberSaga,
    postSignupSaga,
    postCheckEmailSaga,
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
    postAddRoleSaga,
    postAssignFunctionsSaga,
    // incidementmgmt
    getSearchParamSaga,
    postSearchIncidentSaga,
    postDeleteIncidentsSaga,
    postNewIncidentSaga,
    getIncidentSaga,
    postUpdateIncidentSaga,
    // charts
    getChartsDataSaga,
  ]);
}
