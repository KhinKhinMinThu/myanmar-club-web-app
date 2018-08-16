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
export const POST_UPDATEMEMBERSHIPADMIN = '[MEMBERMGMT_DATA] POST_UPDATEMEMBERSHIP';
export const POST_UPDATEMEMBERSHIPMEMBER = '[MEMBERMGMT_DATA] POST_UPDATEMEMBERSHIPMEMBER';
export const POST_ERROR = '[MEMBERMGMT_DATA] POST_ERROR';
// end

// RESET
export const RESET_MEMBERDATA = '[MEMBERMGMT_DATA] RESET_MEMBERDATA';
// end

export const getMemberFormFields = () => ({ type: GET_MEMBERFORMFIELDS });
export const setMemberFormFields = memberFormFields => ({
  type: MEMBERFORMFIELDS,
  payload: memberFormFields,
});
export const getMemberData = id => ({ type: GET_MEMBERDATA, id });
export const resetMemberData = () => ({ type: RESET_MEMBERDATA });
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
export const postUpdateMembershipAdmin = membershipToUpdate => ({
  type: POST_UPDATEMEMBERSHIPADMIN,
  membershipToUpdate,
});
export const postUpdateMembershipMember = membershipToUpdate => ({
  type: POST_UPDATEMEMBERSHIPMEMBER,
  membershipToUpdate,
});

export default function (
  state = {
    isGetApiLoading: false,
    getErrMsg: null,
    isPostApiLoading: false,
    postErrMsg: null,
    ecMembersList: null,
    clubMembersList: null,
    memberData: null,
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
    case RESET_MEMBERDATA:
      return {
        ...state,
        memberData: null,
      };
    default:
      return state;
  }
}
