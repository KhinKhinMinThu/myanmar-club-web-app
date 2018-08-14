// GET API call
export const GET_MEMBERSDATA = '[MEMBERMGMT_DATA] GET_MEMBERSDATA';
export const GET_MEMBERDATA = '[MEMBERMGMT_DATA] GET_MEMBERDATA';
export const GET_APILOADING = '[MEMBERMGMT_DATA] APILOADING';
export const MEMBERDATA = '[MEMBERMGMT_DATA] MEMBERDATA';
export const ECMEMBERSDATA = '[MEMBERMGMT_DATA] ECMEMBERSDATA';
export const CLUBMEMBERSDATA = '[MEMBERMGMT_DATA] CLUBMEMBERSDATA';
export const GET_MEMBERFORMFIELDS = '[MEMBERMGMT_DATA] GET_MEMBERFORMFIELDS';
export const MEMBERFORMFIELDS = '[MEMBERMGMT_DATA] MEMBERFORMFIELDS';
export const GET_ERROR = '[MEMBERMGMT_DATA] GET_ERROR';

// end

// POST to API
export const POST_APILOADING = '[MEMBERMGMT_DATA] POST_APILOADING';
export const POST_DELETEMEMBERS = '[MEMBERMGMT_DATA] POST_DELETEMEMBERS';
export const POST_UPDATEMEMBER = '[MEMBERMGMT_DATA] POST_UPDATEMEMBER';
export const POST_ERROR = '[MEMBERMGMT_DATA] POST_ERROR';
// end

export const getMemberFormFields = () => ({ type: GET_MEMBERFORMFIELDS });
export const setMemberFormFields = memberFormFields => ({
  type: MEMBERFORMFIELDS,
  payload: memberFormFields,
});
export const getMemberData = id => ({ type: GET_MEMBERDATA, id });
export const getMembersData = () => ({ type: GET_MEMBERSDATA });
export const setMemberData = memberData => ({
  type: MEMBERDATA,
  payload: memberData,
});
export const setEcMembersData = ecMembersList => ({
  type: ECMEMBERSDATA,
  payload: ecMembersList,
});
export const setClubMembersData = clubMembersList => ({
  type: CLUBMEMBERSDATA,
  payload: clubMembersList,
});
export const postDeleteMembers = membersToDelete => ({
  type: POST_DELETEMEMBERS,
  membersToDelete,
});
export const postUpdateMember = memberToUpdate => ({
  type: POST_UPDATEMEMBER,
  memberToUpdate,
});

// delete
export const SAVE = '[MEMBERMGMT_DATA] SAVE';
export const save = formValues => ({
  type: SAVE,
  payload: formValues,
});
// end delete

export default function (
  state = {
    isGetApiLoading: false,
    getErrMsg: null,
    isPostApiLoading: false,
    postErrMsg: null,
    ecMembersList: null,
    clubMembersList: null,

    // reset back to null
    memberData: {
      id: '2',
      name: 'Yamin',
      gender: 'Female',
      dateOfBirth: '1995-09-09 00:00:00',
      maritalStatus: 'Single',
      educationLevel: 'Degree',
      occupation: 'Student',
      passType: 'Student Pass',
      idNumber: 'G1234099E',
      addressLine1: 'Woodland Street 19',
      addressLine2: 'NA',
      postalCode: '730421',
      emailAddress: 'yamin712@gmail.com',
      photoLink:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      facebookAccount:
        'https://www.facebook.com/yamin.nyinyi?lst=1142744702%3A100003166412891%3A1533655872',
      areaCodeHomePhone: '65',
      homePhone: '',
      areaCodeMobilePhone: '85',
      mobilePhone: '65696090',
      hobbies: 'Swimming',
      isEcMember: '1',

      nationality: 'Korean',
      religion: 'kkkm',
      subComInterest: [{ id: '1' }, { id: '2' }],
      memberRoleToAdd: ['1', '2'],
      memberRoleToRemove: ['3'],
      subComInterestToCheck: ['1', '2'],

      membershipType: 'Life',
      membershipStatus: 'Active',
      PaymentType: 'Cash',
    },
    // end
    memberFormFields: null,
  },
  action,
) {
  switch (action.type) {
    case MEMBERFORMFIELDS:
      return {
        ...state,
        memberFormFields: action.payload,
      };
    case GET_APILOADING:
      return {
        ...state,
        isGetApiLoading: action.payload,
      };
    case MEMBERDATA:
      return {
        ...state,
        memberData: action.payload,
      };
    case ECMEMBERSDATA:
      return {
        ...state,
        ecMembersList: action.payload,
      };
    case CLUBMEMBERSDATA:
      return {
        ...state,
        clubMembersList: action.payload,
      };
    case GET_ERROR:
      return {
        ...state,
        getErrMsg: action.payload,
      };
    case POST_APILOADING:
      return {
        ...state,
        isPostApiLoading: action.payload,
      };
    case POST_ERROR:
      return {
        ...state,
        postErrMsg: action.payload,
      };

    case SAVE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

// roleNames        :        [{id: "2", name: "admin"},{ id: "4",  name:"treasurer" }],

// membershipType         :        "Life",
// membershipStatus         :        "Active",
// createdDate         :        "01-01-2010 11:30:00",
// membershipExpiryDate         :        "01-01-2019 11:30:00",
// lastPaymentDate         :        "01-01-2019 11:30:00",
// lastPaymentType         :        "cash",
