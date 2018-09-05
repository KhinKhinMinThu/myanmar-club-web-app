// GET API call
export const GET_ACCESSCONTROLDATA = '[ACCESSCONTROL_DATA] GET_ACCESSCONTROLDATA';
export const GET_APILOADING = '[ACCESSCONTROL_DATA] GET_APILOADING';
export const ACCESSCONTROLDATA = '[ACCESSCONTROL_DATA] ACCESSCONTROL_DATA';
export const GET_ERROR = '[ACCESSCONTROL_DATA] GET_ERROR';
// end

// POST to API
export const POST_APILOADING = '[ACCESSCONTROL_DATA] POST_APILOADING';
export const POST_DELETEROLE = '[ACCESSCONTROL_DATA] POST_DELETEROLE';
export const POST_ADDTRANSC = '[ACCESSCONTROL_DATA] POST_ADDTRANSC';
export const POST_ERROR = '[ACCESSCONTROL_DATA] POST_ERROR';
// end

export const getAccessControlData = () => ({ type: GET_ACCESSCONTROLDATA });
export const setAccessControlData = accesscontrolData => ({
  type: ACCESSCONTROLDATA,
  payload: accesscontrolData,
});
export const postDeleteRole = rolesToDelete => ({
  type: POST_DELETEROLE,
  rolesToDelete,
});
export const postAddEventTransc = eventTranscToAdd => ({
  type: POST_ADDTRANSC,
  eventTranscToAdd,
});

export default function (
  state = {
    isGetApiLoading: false,
    getErrMsg: null,
    isPostApiLoading: false,
    postErrMsg: null,
    accesscontrolData: null,

    // to update to API
    // eventId: null,
    // transacIdToRemove: null,
    // transacDataToAdd: null,
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
    case ACCESSCONTROLDATA:
      return {
        ...state,
        accesscontrolData: action.payload,
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
