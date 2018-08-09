// GET API call
export const GET_EVENTSDATA = '[EVENTMGMT_DATA] GET_EVENTSDATA';
export const GET_APILOADING = '[EVENTMGMT_DATA] GET_APILOADING';
export const EVENTSDATA = '[EVENTMGMT_DATA] EVENTSDATA';
export const GET_ERROR = '[EVENTMGMT_DATA] GET_ERROR';
// end

// POST to API
export const POST_APILOADING = '[EVENTMGMT_DATA] POST_APILOADING';
export const POST_DELETEEVENT = '[EVENTMGMT_DATA] POST_DELETEEVENT';
export const POST_DELETERSVP = '[EVENTMGMT_DATA] POST_DELETERSVP';
export const POST_ERROR = '[EVENTMGMT_DATA] POST_ERROR';
// end

export const getEventsData = () => ({ type: GET_EVENTSDATA });
export const setEventsData = eventsData => ({
  type: EVENTSDATA,
  payload: eventsData,
});
export const postDeleteEvent = eventsToDelete => ({
  type: POST_DELETEEVENT,
  eventsToDelete,
});
export const postDeleteRSVP = eventRSVPToDelete => ({
  type: POST_DELETERSVP,
  eventRSVPToDelete,
});

// delete
export const save = eventRSVPToDelete => ({
  type: POST_DELETERSVP,
  eventRSVPToDelete,
});
// delete
export const remove = eventRSVPToDelete => ({
  type: POST_DELETERSVP,
  eventRSVPToDelete,
});

export default function (
  state = {
    isGetApiLoading: false,
    getErrMsg: null,
    isPostApiLoading: false,
    postErrMsg: null,
    eventsData: null,

    id: null,
    name: null,
    description: null,
    startDate: null,
    endDate: null,
    locationLine1: null,
    locationLine2: null,
    locationPostalCode: null,
    ticketFee: null,
    noOfPax: null,
    isRefreshmentProvided: null,
    contactPerson: null,
    emailAddress: null,
    mobilePhone: null,
    eventStatus: null,
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
    case EVENTSDATA:
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
