// GET API call
export const GET_EVENTTRANSACDATA = '[EVENTTRANSAC_DATA] GET_EVENTTRANSACDATA';
export const GET_APILOADING = '[EVENTTRANSAC_DATA] GET_APILOADING';
export const EVENTTRANSACDATA = '[EVENTTRANSAC_DATA] EVENTTRANSACDATA';
export const GET_ERROR = '[EVENTTRANSAC_DATA] GET_ERROR';
// end

// POST to API
export const POST_APILOADING = '[EVENTTRANSAC_DATA] POST_APILOADING';
export const POST_DELETETRANSC = '[EVENTTRANSAC_DATA] POST_DELETETRANSC';
export const POST_ADDTRANSC = '[EVENTTRANSAC_DATA] POST_ADDTRANSC';
export const POST_ERROR = '[EVENTTRANSAC_DATA] POST_ERROR';
// end

export const getEventTranscData = () => ({ type: GET_EVENTTRANSACDATA });
export const setEventTranscData = eventsData => ({
  type: EVENTTRANSACDATA,
  payload: eventsData,
});
export const postDeleteEventTransc = eventTranscToDelete => ({
  type: POST_DELETETRANSC,
  eventTranscToDelete,
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
    eventsData: null,

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
    case EVENTTRANSACDATA:
      return {
        ...state,
        eventsData: action.payload,
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
