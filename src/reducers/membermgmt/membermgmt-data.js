// GET API call
export const GET_MEMBERSDATA = '[MEMBERMGMT_DATA] GET_MEMBERSDATA';
export const GET_APILOADING = '[MEMBERMGMT_DATA] APILOADING';
export const ECMEMBERSDATA = '[MEMBERMGMT_DATA] ECMEMBERSDATA';
export const CLUBMEMBERSDATA = '[MEMBERMGMT_DATA] CLUBMEMBERSDATA';
export const GET_ERROR = '[MEMBERMGMT_DATA] GET_ERROR';
// end

// POST to API
export const POST_APILOADING = '[MEMBERMGMT_DATA] POST_APILOADING';
export const POST_DELETEMEMBERS = '[MEMBERMGMT_DATA] POST_DELETEMEMBERS';
export const POST_ERROR = '[MEMBERMGMT_DATA] POST_ERROR';
// end

export const getMembersData = () => ({ type: GET_MEMBERSDATA });
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

    memberId: 12, // need to change back to id
    firstName: 'Khin Khin',
    middleName: '-',
    lastName: 'Min Thu',
    gender: 'F',
    dob: ('07-09-1992', 'DD-MM-YYYY'),
    nationality: 'OT',
    otherNationality: 'KK',
    religion: 'BU',
    otherReligion: '',
    maritalStatus: 'SI',
    education: 'PRIMARY',
    occupation: 'STUDENT',
    stayPass: 'SP',
    id: 'S1234567X', // need to rename other than id
    memberRoles: [1, 2],
    allRoles: [
      {
        id: 1,
        name: 'ADMIN',
      },
      {
        id: 2,
        name: 'TREASURER',
      },
      {
        id: 3,
        name: 'OTHER ROLE 3',
      },
      {
        id: 4,
        name: 'OTHER ROLE 4',
      },
    ],

    // membership information
    memberType: 'Life Member', // DB col: membership_type
    status: 'Active', // membership_status
    expiryDate: '20-01-2019', // membership_expiry
    joinedDate: '01-01-2017', // created_at member table
    lastPaymentDate: '11-07-2018', // created_at renew table
    lastPaymentType: 'Cash', // payment_type renew table
    newPaymentType: '',
    // end

    // to update to API
    roleTransfer: [],
    // end
  },
  action,
) {
  switch (action.type) {
    case GET_APILOADING:
      return {
        ...state,
        isGetApiLoading: action.payload,
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
