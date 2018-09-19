// GET API call
export const GET_ROLEDATA = '[ROLEMGMT_DATA] GET_ROLEDATA';
export const GET_APILOADING = '[ROLEMGMT_DATA] APILOADING';
export const ROLEDATA = '[ROLEMGMT_DATA] ROLEDATA';
export const ROLENAMELIST = '[ROLEMGMT_DATA] ROLENAMELIST';
export const ALLECLIST = '[ROLEMGMT_DATA] ALLECLIST';
export const GET_ERROR = '[ROLEMGMT_DATA] GET_ERROR';
// end

// POST to API
export const POST_APILOADING = '[ROLEMGMT_DATA] POST_APILOADING';
export const POST_ASSIGNROLES = '[ROLEMGMT_DATA] POST_ASSIGNROLES';
export const POST_ERROR = '[ROLEMGMT_DATA] POST_ERROR';
// end

export const getRoleData = () => ({ type: GET_ROLEDATA });
export const setRoleData = roleData => ({
  type: ROLEDATA,
  payload: roleData,
});
export const setRoleNameList = roleNameList => ({
  type: ROLENAMELIST,
  payload: roleNameList,
});
export const setAllEcList = allEcList => ({
  type: ALLECLIST,
  payload: allEcList,
});
export const postAssignRoles = rolesAssignment => ({
  type: POST_ASSIGNROLES,
  rolesAssignment,
});

export default function (
  state = {
    isGetApiLoading: false,
    getErrMsg: null,
    isPostApiLoading: false,
    postErrMsg: null,
    roleData: null,
    roleNameList: [],
    allEcList: [],
  },
  action,
) {
  switch (action.type) {
    case ROLEDATA:
      return {
        ...state,
        roleData: action.payload,
      };
    case ROLENAMELIST:
      return {
        ...state,
        roleNameList: action.payload,
      };
    case ALLECLIST:
      return {
        ...state,
        allEcList: action.payload,
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
