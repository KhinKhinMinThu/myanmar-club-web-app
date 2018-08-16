import { put, call, takeLatest } from 'redux-saga/effects';
import { api, apiMultiPart } from './api';
import {
  GET_MEMBERSDATA,
  GET_MEMBERDATA,
  GET_MEMBERFORMFIELDS,
  MEMBERFORMFIELDS,
  GET_APILOADING,
  MEMBERDATA,
  ECMEMBERSDATA,
  CLUBMEMBERSDATA,
  GET_ERROR,
  POST_APILOADING,
  POST_DELETEMEMBERS,
  POST_UPDATEMEMBER,
  POST_UPDATEMEMBERSHIPADMIN,
  POST_UPDATEMEMBERSHIPMEMBER,
  POST_SIGNUP,
  POST_ERROR,
} from '../reducers/membermgmt/membermgmt-data';
import {
  APIGET_MEMBERSDATA,
  APIGET_MEMBERDATA,
  APIGET_MEBERFORMFIELDS,
  APIPOST_DELETE_MEMBERS,
  APIPOST_UPDATE_PROFILE,
  APIPOST_UPDATE_MEMBERSHIPADMIN,
  APIPOST_UPDATE_MEMBERSHIPMEMBER,
  APIPOST_ADD_MEMBERPHOTO,
  APIPOST_SIGNUP,
} from '../actions/constants';

// GET REQUEST
const getMembersData = () => api.get(APIGET_MEMBERSDATA);
const getMemberFormFields = () => api.get(APIGET_MEBERFORMFIELDS);
// POST TO GET DATA -.-
const getMemberData = id => api.post(APIGET_MEMBERDATA, id);
function* asyncGetMemberData(action) {
  let errMsg;
  try {
    let response;

    yield put({ type: GET_APILOADING, payload: true });
    if (action.type === GET_MEMBERDATA) {
      response = yield call(getMemberData, action.id);
      const { memberData, errorMsg } = response.data;
      errMsg = errorMsg;

      console.log('API RESPONSE.........', response);
      yield put({ type: MEMBERDATA, payload: memberData });
    }
    if (action.type === GET_MEMBERFORMFIELDS) {
      response = yield call(getMemberFormFields);
      const { memberFormFields, errorMsg } = response.data;
      errMsg = errorMsg;
      console.log('API RESPONSE.........', response);

      memberFormFields.allSubComInterest.forEach((item, index) => {
        memberFormFields.allSubComInterest[index] = {
          ...item,
          id: 'subComChk'.concat(item.id),
        };
      });
      yield put({ type: MEMBERFORMFIELDS, payload: memberFormFields });
    }
  } catch (e) {
    errMsg = e.message;
  } finally {
    yield put({ type: GET_ERROR, payload: errMsg });
    yield put({ type: GET_APILOADING, payload: false });
  }
}

function* asyncGetMembersData() {
  let errMsg;
  try {
    yield put({ type: GET_APILOADING, payload: true });
    const response = yield call(getMembersData);
    const { membersData, errorMsg } = response.data;
    errMsg = errorMsg;
    const ecMembersList = membersData.filter(item => item.isEcMember === '1');
    const clubMembersList = membersData.filter(item => item.isEcMember === '0');

    yield put({ type: ECMEMBERSDATA, payload: ecMembersList });
    yield put({ type: CLUBMEMBERSDATA, payload: clubMembersList });
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
const postDeleteMembers = membersToDelete => api.post(APIPOST_DELETE_MEMBERS, membersToDelete);

// not posting with api.post(APIPOST_ADD_EVENT, { memberToUpdate });
// in order to filter uncessary data
const postUpdateMember = memberToUpdate => api.post(APIPOST_UPDATE_PROFILE, {
  id: memberToUpdate.id,
  name: memberToUpdate.name,
  gender: memberToUpdate.gender,
  dateOfBirth: memberToUpdate.dateOfBirth,
  maritalStatus: memberToUpdate.maritalStatus,
  educationLevel: memberToUpdate.educationLevel,
  occupation: memberToUpdate.occupation,
  passType: memberToUpdate.passType,
  idNumber: memberToUpdate.idNumber,
  addressLine1: memberToUpdate.addressLine1,
  addressLine2: memberToUpdate.addressLine2,
  postalCode: memberToUpdate.postalCode,
  emailAddress: memberToUpdate.emailAddress,
  password: memberToUpdate.password,
  facebookAccount: memberToUpdate.facebookAccount,
  homePhone: memberToUpdate.homePhone,
  mobilePhone: memberToUpdate.mobilePhone,
  hobbies: memberToUpdate.hobbies,
  isEcMember: memberToUpdate.isEcMember,
  nationality: memberToUpdate.nationality,
  religion: memberToUpdate.religion,
  subComInterest: memberToUpdate.subComInterest,
  roleNames: memberToUpdate.roleNames,
});
const postUpdateMembershipAdmin = membershipToUpdate => api.post(APIPOST_UPDATE_MEMBERSHIPADMIN, {
  id: membershipToUpdate.id,
  paymentType: membershipToUpdate.paymentType,
  membershipType: membershipToUpdate.membershipType,
  totalAmount: membershipToUpdate.totalAmount,
});
const postUpdateMembershipMember = membershipToUpdate => api.post(APIPOST_UPDATE_MEMBERSHIPMEMBER, {
  id: membershipToUpdate.id,
  paymentType: membershipToUpdate.paymentType,
  membershipType: membershipToUpdate.membershipType,
  totalAmount: membershipToUpdate.totalAmount,
});
const postMemberPhoto = multipartForm => apiMultiPart.post(APIPOST_ADD_MEMBERPHOTO, multipartForm);
const postSignup = memberToAdd => api.post(APIPOST_SIGNUP, {
  name: memberToAdd.name,
  gender: memberToAdd.gender,
  dateOfBirth: memberToAdd.dateOfBirth,
  nationality: memberToAdd.nationality,
  religion: memberToAdd.religion,
  maritalStatus: memberToAdd.maritalStatus,
  educationLevel: memberToAdd.educationLevel,
  occupation: memberToAdd.occupation,
  passType: memberToAdd.passType,
  idNumber: memberToAdd.idNumber,
  addressLine1: memberToAdd.addressLine1,
  addressLine2: memberToAdd.addressLine2,
  postalCode: memberToAdd.postalCode,
  emailAddress: memberToAdd.emailAddress,
  password: memberToAdd.password,
  facebookAccount: memberToAdd.facebookAccount,
  homePhone: memberToAdd.homePhone,
  mobilePhone: memberToAdd.mobilePhone,
  hobbies: memberToAdd.hobbies,
  subComInterest: memberToAdd.subComInterest,
  membershipType: memberToAdd.membershipType,
  paymentType: memberToAdd.paymentType,
  totalAmount: memberToAdd.totalAmount,
});
const assembleFormData = ({ memberId, imageFile }) => {
  if (memberId && imageFile) {
    const mpf = new FormData();
    mpf.append('id', memberId);
    mpf.append('memberPhoto', imageFile, imageFile.name);
    return mpf;
  }
  return null;
};

function* asyncPostProcessMembers(action) {
  let errMsg;
  try {
    yield put({ type: POST_APILOADING, payload: true });
    let response;

    console.log(
      'Calling API.........',
      action.type,
      action.membersToDelete,
      action.memberToUpdate,
      action.membershipToUpdate,
    );

    let multipartForm;
    const memberData = action.memberToUpdate;

    switch (action.type) {
      case POST_DELETEMEMBERS:
        response = yield call(postDeleteMembers, action.membersToDelete);
        break;
      case POST_UPDATEMEMBER:
        response = yield call(postUpdateMember, action.memberToUpdate);
        multipartForm = assembleFormData({
          memberId: memberData.id,
          imageFile: memberData.uploadBtn[0],
        });
        console.log('memberId', memberData.id, 'mpf', multipartForm);
        if (multipartForm) response = yield call(postMemberPhoto, multipartForm);

        break;
      case POST_UPDATEMEMBERSHIPADMIN:
        response = yield call(
          postUpdateMembershipAdmin,
          action.membershipToUpdate,
        );
        break;
      case POST_UPDATEMEMBERSHIPMEMBER:
        response = yield call(
          postUpdateMembershipMember,
          action.membershipToUpdate,
        );
        break;
      case POST_SIGNUP:
        response = yield call(postSignup, action.memberToAdd);
        break;
      default:
    }

    console.log('API RESPONSE.........', response);

    const { errorMsg } = response.data;
    errMsg = errorMsg;
  } catch (e) {
    errMsg = e.message;
  } finally {
    yield put({ type: POST_ERROR, payload: errMsg });
    yield put({ type: POST_APILOADING, payload: false });
  }
}
// end

export const getMembersDataSaga = takeLatest(
  GET_MEMBERSDATA,
  asyncGetMembersData,
);

export const getMemberFormFieldsSaga = takeLatest(
  GET_MEMBERFORMFIELDS,
  asyncGetMemberData,
);

export const getMemberDataSaga = takeLatest(GET_MEMBERDATA, asyncGetMemberData);

export const postDeleteMembersSaga = takeLatest(
  POST_DELETEMEMBERS,
  asyncPostProcessMembers,
);

export const postUpdateMemberSaga = takeLatest(
  POST_UPDATEMEMBER,
  asyncPostProcessMembers,
);

export const postUpdateMembershipAdminSaga = takeLatest(
  POST_UPDATEMEMBERSHIPADMIN,
  asyncPostProcessMembers,
);

export const postUpdateMembershipMemberSaga = takeLatest(
  POST_UPDATEMEMBERSHIPMEMBER,
  asyncPostProcessMembers,
);

export const postSignupSaga = takeLatest(POST_SIGNUP, asyncPostProcessMembers);
