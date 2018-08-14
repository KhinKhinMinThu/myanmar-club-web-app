import { put, call, takeLatest } from 'redux-saga/effects';
import { api } from './api';
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
  POST_ERROR,
} from '../reducers/membermgmt/membermgmt-data';
import {
  APIGET_MEMBERSDATA,
  APIGET_MEMBERDATA,
  APIGET_MEBERFORMFIELDS,
  APIPOST_DELETE_MEMBERS,
  APIPOST_UPDATE_PROFILE,
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
      // delete below

      const subComInterest = [
        { id: '2', description: 'develipment' },
        { id: '4', description: 'other interest' },
      ];
      memberData.subComInterest = subComInterest.map;
      // end delete

      yield put({ type: MEMBERDATA, payload: memberData });
    }
    if (action.type === GET_MEMBERFORMFIELDS) {
      response = yield call(getMemberFormFields);
      const { memberFormFields, errorMsg } = response.data;
      errMsg = errorMsg;
      // delete below
      const allSubComInterest = [
        {
          id: '1',
          description:
            'မြန်မာ့ယဉ်ကျေးမှုအနုပညာ ထိန်းသိမ်းမြှင့်တင် ပျံ့ပွားရေး Sub-Committee',
        },
        {
          id: '2',
          description:
            'စာပေ၊ ဗဟုသုတ၊ တတ်သိပညာ မြှင့်တင် ပျံ့ပွားရေး Sub-Committee',
        },
        {
          id: '3',
          description:
            'စင်္ကာပူရောက် မြန်မာမိသားစု၏ လူမှုအခက်ခဲများ ကူညီစောင့်ရှောက်ရေးနှင့် ကောင်းမွန်သော လူ့ဘောင်ဘဝ မြှင့်တင်ထိန်းသိမ်းရေး',
        },
        {
          id: '4',
          description: 'မြန်မာ့အားကစားကဏ္ဍ ပံ့ပိုးကူညီရေး Sub-Committee',
        },
      ];
      memberFormFields.allSubComInterest = allSubComInterest;
      // end delete

      memberFormFields.allSubComInterest.forEach((item, index) => {
        memberFormFields.allSubComInterest[index] = {
          ...item,
          id: 'subComChk'.concat(item.id),
        };
      });
      yield put({ type: MEMBERFORMFIELDS, payload: memberFormFields });
    }
    console.log('API RESPONSE.........', response);
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
  facebookAccount: memberToUpdate.facebookAccount,
  homePhone: memberToUpdate.homePhone,
  mobilePhone: memberToUpdate.mobilePhone,
  hobbies: memberToUpdate.hobbies,
  isEcMember: memberToUpdate.isEcMember,
  nationality: memberToUpdate.nationality,
  religion: memberToUpdate.religion,
  subComInterest: memberToUpdate.subComInterest,
});

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
    );

    if (action.type === POST_DELETEMEMBERS) response = yield call(postDeleteMembers, action.membersToDelete);
    if (action.type === POST_UPDATEMEMBER) response = yield call(postUpdateMember, action.memberToUpdate);

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
