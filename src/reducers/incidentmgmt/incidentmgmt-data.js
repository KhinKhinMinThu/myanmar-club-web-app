// GET API call
export const GET_INCIDENT_TYPES = '[INCIDENTMGMT_DATA] GET_INCIDENT_TYPES';
export const GET_SEARCHPARAM = '[INCIDENTMGMT_DATA] GET_SEARCHPARAM';
export const GET_INCIDENT = '[INCIDENTMGMT_DATA] GET_INCIDENT';
export const GET_APILOADING = '[INCIDENTMGMT_DATA] APILOADING';
export const INCIDENTTYPES = '[INCIDENTMGMT_DATA] INCIDENTTYPES';
export const SUBMITTEDBY = '[INCIDENTMGMT_DATA] SUBMITTEDBY';
export const INCIDENTS = '[INCIDENTMGMT_DATA] INCIDENTS';
export const INCIDENT = '[INCIDENTMGMT_DATA] INCIDENT';
export const GET_ERROR = '[INCIDENTMGMT_DATA] GET_ERROR';
// end

// POST to API
export const POST_APILOADING = '[INCIDENTMGMT_DATA] POST_APILOADING';
export const POST_SEARCHINCIDENTS = '[INCIDENTMGMT_DATA] POST_SEARCHINCIDENTS';
export const POST_DELETEINCIDENTS = '[INCIDENTMGMT_DATA] POST_DELETEINCIDENTS';
export const POST_NEWINCIDENT = '[INCIDENTMGMT_DATA] POST_NEWINCIDENT';
export const POST_UPDATEINCIDENT = '[INCIDENTMGMT_DATA] POST_UPDATEINCIDENT';
export const POST_ERROR = '[INCIDENTMGMT_DATA] POST_ERROR';
// end

export const getIncident = id => ({ type: GET_INCIDENT, id });
export const getIncidentTypes = () => ({ type: GET_INCIDENT_TYPES });
export const getSearchParams = () => ({ type: GET_SEARCHPARAM });
export const postSearchIncident = searchParams => ({
  type: POST_SEARCHINCIDENTS,
  searchParams,
});
export const postDeleteIncidents = incidentsToDelete => ({
  type: POST_DELETEINCIDENTS,
  incidentsToDelete,
});

export const setIncidents = incidents => ({
  type: INCIDENTS,
  payload: incidents,
});
export const setIncident = incident => ({
  type: INCIDENT,
  payload: incident,
});
export const postNewIncident = newIncidentToAdd => ({
  type: POST_NEWINCIDENT,
  newIncidentToAdd,
});
export const postUpdateIncident = incidentToUpdate => ({
  type: POST_UPDATEINCIDENT,
  incidentToUpdate,
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
    incident: [],
  },
  action,
) {
  switch (action.type) {
    case INCIDENT:
      return {
        ...state,
        incident: action.payload,
      };
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
