export const POST_LOGIN = '[LOGIN_DATA] POST_LOGIN';
export const LOGINDATA = '[LOGIN_DATA] LOGINDATA';

// export const ISLOGGEDIN = '[LOGIN_DATA] ISLOGGEDIN';
// export const ISADMIN = '[LOGIN_DATA] ISADMIN';
// export const TOKEN = '[LOGIN_DATA] TOKEN';

export const LOGOUT = '[LOGIN_DATA] LOGOUT';
export const POST_APILOADING = '[LOGIN_DATA] POST_APILOADING';
export const POST_ERROR = '[LOGIN_DATA] POST_ERROR';
export const AUTHENTICATED_USER = '[LOGIN_DATA] AUTHENTICATED_USER';

export const postLogin = userData => ({ type: POST_LOGIN, userData });

export const setLoginData = loginData => ({
  type: LOGINDATA,
  payload: loginData,
});
export const setLogout = initialLoginState => ({
  type: LOGOUT,
  payload: initialLoginState,
});

export const initialLoginState = {
  isPostApiLoading: false,
  postErrMsg: null,
  isAdmin: false, // change to false
  isLoggedIn: false, // change to false
  token: 'dummytoken',
};
export default function (state = { ...initialLoginState }, action) {
  switch (action.type) {
    case AUTHENTICATED_USER:
      return {
        ...state,
        ...action.payload,
      };
    case LOGOUT:
      return {
        ...initialLoginState,
      };
    case LOGINDATA:
      return {
        ...state,
        ...action.payload,
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
