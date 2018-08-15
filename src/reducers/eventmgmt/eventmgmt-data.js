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
export const POST_NEWEVENT = '[EVENTMGMT_DATA] POST_NEWEVENT';
export const POST_NEWEVENTRSVP = '[EVENTMGMT_DATA] POST_NEWEVENTRSVP';
export const POST_UPDATEEVENT = '[EVENTMGMT_DATA] POST_UPDATEEVENT';
export const POST_NOTIFYEVENT = '[EVENTMGMT_DATA] POST_NOTIFYEVENT';
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
export const postNewEvent = newEventToAdd => ({
  type: POST_NEWEVENT,
  newEventToAdd,
});
export const postNewRSVP = newEventRSVPToAdd => ({
  type: POST_NEWEVENTRSVP,
  newEventRSVPToAdd,
});
export const postUpdateEvent = eventToUpdate => ({
  type: POST_UPDATEEVENT,
  eventToUpdate,
});
export const postNotifyEvent = notification => ({
  type: POST_NOTIFYEVENT,
  notification,
});

export default function (
  state = {
    isGetApiLoading: false,
    getErrMsg: null,
    isPostApiLoading: false,
    postErrMsg: null,
    eventsData: null,
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
