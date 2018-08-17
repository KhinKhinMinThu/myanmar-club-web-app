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
// delete
export const SAVE = '[ROLEMGMT_DATA] SAVE';

export const save = values => ({
  type: SAVE,
  payload: values,
});
// end

export default function (
  state = {
    isGetApiLoading: false,
    getErrMsg: null,
    isPostApiLoading: false,
    postErrMsg: null,
    roleData: null,
    roleNameList: [],
    allEcList: [],

    // to get the data from API
    roleData1: [
      {
        roleId: 0,
        roleName: 'ECMEMBERS',
        executives: [
          { id: 1, name: 'Member1' },
          { id: 2, name: 'Member2' },
          { id: 3, name: 'Member3' },
          { id: 4, name: 'Member4' },
        ],
      },
      {
        roleId: 1,
        roleName: 'ROLE1',
        executives: [
          { id: 1, name: 'Member1' },
          { id: 2, name: 'Member2' },
          { id: 3, name: 'Member3' },
        ],
      },
      {
        roleId: 2,
        roleName: 'ROLE2',
        executives: [{ id: 1, name: 'Member1' }, { id: 4, name: 'Member4' }],
      },
    ],
    // end

    // to update to API
    roleId: 0,
    transferFrom: [],
    transferTo: [],
    // end
  },
  action,
) {
  switch (action.type) {
    // delete
    case SAVE:
      return {
        ...state,
        ...action.payload,
      };
    // end
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
