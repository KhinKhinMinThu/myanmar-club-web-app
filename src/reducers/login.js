export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const login = userData => ({ type: LOGIN, userData });
export const logout = () => ({ type: LOGOUT });

/**
 * errMsg can be wrong password/username or network errors
 * errMsg: null, means logout,
 * errMsg: '', means successful login,
 */

export default function (
  state = {
    isPending: false,
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
      };
    default:
      return state;
  }
}
