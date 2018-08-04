export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGGEDIN = 'LOGGEDIN';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const ADMIN = 'LOGIN_ADMIN';

export const login = userData => ({ type: LOGIN, userData });
export const logout = isLoggedIn => ({ type: LOGOUT, payload: isLoggedIn });
export const setAdmin = isAdmin => ({ type: ADMIN, payload: isAdmin });
/**
 * errMsg can be wrong password/username or network errors
 * errMsg: null, means logout,
 * errMsg: '', means successful login,
 */

export default function (
  state = {
    isPending: false,
    isLoggedIn: false,
    isAdmin: true,
    errMsg: null,
  },
  action,
) {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        isPending: true,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isPending: false,
        errMsg: action.errMsg,
      };
    case LOGOUT:
      return {
        ...state,
        isPending: false,
        errMsg: null,
        isLoggedIn: action.payload,
      };
    case LOGGEDIN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case ADMIN:
      return {
        ...state,
        isAdmin: action.payload,
      };
    default:
      return state;
  }
}
