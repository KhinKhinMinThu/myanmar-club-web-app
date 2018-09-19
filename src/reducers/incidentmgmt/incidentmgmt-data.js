// GET API call
export const GET_INCIDENT_TYPES = '[INCIDENTMGMT_DATA] GET_INCIDENT_TYPES';
export const GET_SEARCHPARAM = '[INCIDENTMGMT_DATA] GET_SEARCHPARAM';
export const GET_APILOADING = '[INCIDENTMGMT_DATA] APILOADING';
export const INCIDENTTYPES = '[INCIDENTMGMT_DATA] INCIDENTTYPES';
export const SUBMITTEDBY = '[INCIDENTMGMT_DATA] SUBMITTEDBY';
export const INCIDENTS = '[INCIDENTMGMT_DATA] INCIDENTS';
export const GET_ERROR = '[INCIDENTMGMT_DATA] GET_ERROR';
// end

// POST to API
export const POST_APILOADING = '[INCIDENTMGMT_DATA] POST_APILOADING';
export const POST_SEARCHINCIDENTS = '[INCIDENTMGMT_DATA] POST_SEARCHINCIDENTS';
export const POST_ERROR = '[INCIDENTMGMT_DATA] POST_ERROR';
// end

export const getIncidentTypes = () => ({ type: GET_INCIDENT_TYPES });
export const getSearchParams = () => ({ type: GET_SEARCHPARAM });
export const postSearchIncident = searchParams => ({
  type: POST_SEARCHINCIDENTS,
  searchParams,
});

export default function (
  state = {
    isGetApiLoading: false,
    getErrMsg: null,
    isPostApiLoading: false,
    postErrMsg: null,
    incidentTypes: [],
    submittedBy: [],
    incidents: [],
  },
  action,
) {
  switch (action.type) {
    case INCIDENTTYPES:
      return {
        ...state,
        incidentTypes: action.payload,
      };
    case SUBMITTEDBY:
      return {
        ...state,
        submittedBy: action.payload,
      };
    case INCIDENTS:
      return {
        ...state,
        incidents: action.payload,
      };
    case GET_APILOADING:
      return {
        ...state,
        isGetApiLoading: action.payload,
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
