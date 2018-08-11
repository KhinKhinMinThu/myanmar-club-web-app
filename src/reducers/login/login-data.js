export const POST_LOGIN = '[LOGIN_DATA] POST_LOGIN';
export const ISLOGGEDIN = '[LOGIN_DATA] ISLOGGEDIN';
export const ISADMIN = '[LOGIN_DATA] ISADMIN';
export const TOKEN = '[LOGIN_DATA] TOKEN';
export const POST_APILOADING = '[LOGIN_DATA] POST_APILOADING';
export const POST_ERROR = '[LOGIN_DATA] POST_ERROR';

export const postLogin = userData => ({ type: POST_LOGIN, userData });

export const setIsLoggedIn = isLoggedIn => ({
  type: ISLOGGEDIN,
  payload: isLoggedIn,
});

export default function (
  state = {
    isPostApiLoading: false,
    postErrMsg: null,
    isAdmin: true,
    isLoggedIn: true,
    token: '',
  },
  action,
) {
  switch (action.type) {
    case ISADMIN:
      return {
        ...state,
        isAdmin: action.payload,
      };
    case ISLOGGEDIN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case TOKEN:
      return {
        ...state,
        token: action.payload,
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
