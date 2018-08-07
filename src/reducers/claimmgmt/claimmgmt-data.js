// GET API call
export const GET_CLAIMSDATA = '[CLAIMMGMT_DATA] GETCLAIMSDATA';
export const APILOADING = '[CLAIMMGMT_UI] APILOADING';
export const NEWCLAIMSDATA = '[CLAIMMGMT_DATA] NEWCLAIMSDATA';
export const OLDCLAIMSDATA = '[CLAIMMGMT_DATA] OLDCLAIMSDATA';
export const GET_ERROR = '[CLAIMMGMT_DATA] GET_ERROR';
// end

// POST to API
export const POST_APILOADING = '[CLAIMMGMT_UI] POST_APILOADING';
export const POST_APPROVECLAIMS = '[CLAIMMGMT_DATA] POST_APPROVECLAIMS';
export const POST_UNAPPROVECLAIMS = '[CLAIMMGMT_DATA] POST_UNAPPROVECLAIMS';
export const POST_ERROR = '[CLAIMMGMT_DATA] POST_ERROR';
// end

export const getClaimsData = () => ({ type: GET_CLAIMSDATA });
export const setNewClaimsData = newClaimsList => ({
  type: NEWCLAIMSDATA,
  payload: newClaimsList,
});
export const setOldClaimsData = oldClaimsList => ({
  type: OLDCLAIMSDATA,
  payload: oldClaimsList,
});
export const postApproveClaims = claimsToApprove => ({
  type: POST_APPROVECLAIMS,
  claimsToApprove,
});
export const postUnApproveClaims = claimsToUnApprove => ({
  type: POST_UNAPPROVECLAIMS,
  claimsToUnApprove,
});

export default function (
  state = {
    isApiLoading: false,
    getErrMsg: null,
    isPostApiLoading: false,
    postErrMsg: null,
    newClaimsList: null,
    oldClaimsList: null,

    // claimsToApprove: [],
    // claimsToUnApprove: [],
  },
  action,
) {
  switch (action.type) {
    case APILOADING:
      return {
        ...state,
        isApiLoading: action.payload,
      };
    case NEWCLAIMSDATA:
      return {
        ...state,
        newClaimsList: action.payload,
      };
    case OLDCLAIMSDATA:
      return {
        ...state,
        oldClaimsList: action.payload,
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
    default:
      return state;
  }
}
