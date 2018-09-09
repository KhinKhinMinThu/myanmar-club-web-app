// GET API call
export const GET_ACCESSCONTROLDATA = '[ACCESSCONTROL_DATA] GET_ACCESSCONTROLDATA';
export const GET_APILOADING = '[ACCESSCONTROL_DATA] GET_APILOADING';
export const ACCESSCONTROLDATA = '[ACCESSCONTROL_DATA] ACCESSCONTROL_DATA';
export const GET_ERROR = '[ACCESSCONTROL_DATA] GET_ERROR';
export const ALLFUCNTIONLIST = '[ACCESSCONTROL_DATA] ALLFUCNTIONLIST';
// end

// POST to API
export const POST_APILOADING = '[ACCESSCONTROL_DATA] POST_APILOADING';
export const POST_DELETEROLE = '[ACCESSCONTROL_DATA] POST_DELETEROLE';
export const POST_ERROR = '[ACCESSCONTROL_DATA] POST_ERROR';
export const POST_NEWROLE = '[ACCESSCONTROL_DATA] POST_NEWROLE';
export const POST_ASSIGNFUNCTIONS = '[ACCESSCONTROL_DATA] POST_ASSIGNFUNCTIONS';
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

export const postNewRole = newRoleToAdd => ({
  type: POST_NEWROLE,
  newRoleToAdd,
});

export const setAllFunctionList = allFunctionList => ({
  type: ALLFUCNTIONLIST,
  payload: allFunctionList,
});

export const postAssignFunctions = functionsAssignment => ({
  type: POST_ASSIGNFUNCTIONS,
  functionsAssignment,
});

export default function (
  state = {
    isGetApiLoading: false,
    getErrMsg: null,
    isPostApiLoading: false,
    postErrMsg: null,
    accesscontrolData: null,
    allFunctionList: [],
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
    case ALLFUCNTIONLIST:
      return {
        ...state,
        allFunctionList: action.payload,
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
