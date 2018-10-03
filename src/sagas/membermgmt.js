import { put, call, takeLatest } from 'redux-saga/effects';
import {
  api,
  apiMultiPart,
  getAuthHeader,
  getAuthMultiPartHeader,
} from './api';
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
  POST_CHECKEMAIL,
  CHECKEMAIL,
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
  APIPOST_CHECKEMAIL,
} from '../actions/constants';

// GET REQUEST
const getMembersData = authHeader => api.get(APIGET_MEMBERSDATA, authHeader);
const getMemberFormFields = authHeader => api.get(APIGET_MEBERFORMFIELDS, authHeader);
// POST TO GET DATA -.-
const getMemberData = (id, authHeader) => api.post(APIGET_MEMBERDATA, id, authHeader);
function* asyncGetMemberData(action) {
  let errMsg;
  try {
    const authHeader = yield call(getAuthHeader);
    let response;

    yield put({ type: GET_APILOADING, payload: true });
    if (action.type === GET_MEMBERDATA) {
      response = yield call(getMemberData, action.id, authHeader);
      if (response) {
        const { memberData, errorMsg } = response.data;
        errMsg = errorMsg;

        if (memberData) {
          yield put({ type: MEMBERDATA, payload: memberData });
          // call formfields
          yield put({ type: GET_MEMBERFORMFIELDS });
        }
      }
    }
    if (action.type === GET_MEMBERFORMFIELDS) {
      response = yield call(getMemberFormFields, authHeader);
      if (response) {
        const { memberFormFields, errorMsg } = response.data;
        errMsg = errorMsg;

        if (memberFormFields) {
          memberFormFields.allSubComInterest.forEach((item, index) => {
            memberFormFields.allSubComInterest[index] = {
              ...item,
              id: 'subComChk'.concat(item.id),
            };
          });
          yield put({ type: MEMBERFORMFIELDS, payload: memberFormFields });
        }
      }
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
    const authHeader = yield call(getAuthHeader);
    yield put({ type: GET_APILOADING, payload: true });
    const response = yield call(getMembersData, authHeader);
    if (response) {
      const { membersData, errorMsg } = response.data;
      errMsg = errorMsg;
      if (membersData) {
        const ecMembersList = membersData.filter(
          item => item.isEcMember === '1',
        );
        const clubMembersList = membersData.filter(
          item => item.isEcMember === '0',
        );

        yield put({ type: ECMEMBERSDATA, payload: ecMembersList });
        yield put({ type: CLUBMEMBERSDATA, payload: clubMembersList });
      }
    }
  } catch (e) {
    errMsg = e.message;
  } finally {
    yield put({ type: GET_ERROR, payload: errMsg });
    yield put({ type: GET_APILOADING, payload: false });
  }
}
// end

// POST REQUEST
const postDeleteMembers = (membersToDelete, authHeader) => api.post(APIPOST_DELETE_MEMBERS, membersToDelete, authHeader);

// not posting with api.post(APIPOST_ADD_EVENT, { memberToUpdate });
// in order to filter uncessary data
const postUpdateMember = (memberToUpdate, authHeader) => api.post(
  APIPOST_UPDATE_PROFILE,
  {
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
  },
  authHeader,
);
const postUpdateMembershipAdmin = (membershipToUpdate, authHeader) => api.post(
  APIPOST_UPDATE_MEMBERSHIPADMIN,
  {
    id: membershipToUpdate.id,
    paymentType: membershipToUpdate.paymentType,
    membershipType: membershipToUpdate.membershipType,
    totalAmount: membershipToUpdate.totalAmount,
  },
  authHeader,
);
const postUpdateMembershipMember = (membershipToUpdate, authHeader) => api.post(
  APIPOST_UPDATE_MEMBERSHIPMEMBER,
  {
    id: membershipToUpdate.id,
    paymentType: membershipToUpdate.paymentType,
    membershipType: membershipToUpdate.membershipType,
    totalAmount: membershipToUpdate.totalAmount,
  },
  authHeader,
);
const postMemberPhoto = (multipartForm, authMultiPartHeader) => apiMultiPart.post(
  APIPOST_ADD_MEMBERPHOTO,
  multipartForm,
  authMultiPartHeader,
);
const postSignup = (memberToAdd, authHeader) => api.post(
  APIPOST_SIGNUP,
  {
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
  },
  authHeader,
);
const postCheckEmail = (checkParams, authHeader) => api.post(
  APIPOST_CHECKEMAIL,
  {
    memberId: checkParams.memberId,
    email: checkParams.email,
  },
  authHeader,
);
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
    const authHeader = yield call(getAuthHeader);
    const authMultiPartHeader = yield call(getAuthMultiPartHeader);
    yield put({ type: POST_APILOADING, payload: true });
    let response;

    console.log(
      'Calling API.........',
      action.type,
      action.membersToDelete,
      action.memberToUpdate,
      action.membershipToUpdate,
      action.memberToAdd,
      action.checkParams,
    );

    let multipartForm;
    let isEmailFound = '0';
    const memberData = action.memberToAdd || action.memberToUpdate;

    switch (action.type) {
      case POST_DELETEMEMBERS:
        response = yield call(
          postDeleteMembers,
          action.membersToDelete,
          authHeader,
        );
        break;
      case POST_UPDATEMEMBER:
        // **********************
        // check for existing email
        response = yield call(
          postCheckEmail,
          {
            memberId: memberData.id,
            email: memberData.emailAddress,
          },
          authHeader,
        );
        isEmailFound = response.data.isFound;
        yield put({ type: CHECKEMAIL, payload: response.data.isFound });
        // **********************
        if (isEmailFound === '0') {
          response = yield call(
            postUpdateMember,
            action.memberToUpdate,
            authHeader,
          );
          multipartForm = assembleFormData({
            memberId: memberData.id,
            imageFile: memberData.uploadBtn[0],
          });
          if (multipartForm) {
            response = yield call(
              postMemberPhoto,
              multipartForm,
              authMultiPartHeader,
            );
          }
        }
        break;
      case POST_UPDATEMEMBERSHIPADMIN:
        response = yield call(
          postUpdateMembershipAdmin,
          action.membershipToUpdate,
          authHeader,
        );
        break;
      case POST_UPDATEMEMBERSHIPMEMBER:
        response = yield call(
          postUpdateMembershipMember,
          action.membershipToUpdate,
          authHeader,
        );
        break;
      case POST_SIGNUP:
        response = yield call(postSignup, action.memberToAdd, authHeader);
        multipartForm = assembleFormData({
          memberId: response.data.id,
          imageFile: memberData.uploadBtn[0],
        });
        if (multipartForm) {
          response = yield call(
            postMemberPhoto,
            multipartForm,
            authMultiPartHeader,
          );
        }
        break;
      case POST_CHECKEMAIL:
        response = yield call(postCheckEmail, action.checkParams, authHeader);
        yield put({ type: CHECKEMAIL, payload: response.data.isFound });
        break;
      default:
    }

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

export const postCheckEmailSaga = takeLatest(
  POST_CHECKEMAIL,
  asyncPostProcessMembers,
);
