export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_STATUS = 'LOGIN_STATUS';
export const LOGIN_NETWORK_ERROR = 'LOGIN_NETWORK_ERROR';

export const login = userData => ({ type: LOGIN, userData });
export const logout = () => ({ type: LOGOUT });

export default function (
  state = {
    isPending: false,
    status: false,
    networkErrorMsg: '',
  },
  action,
) {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        isPending: true,
      };
    case LOGIN_STATUS:
      return {
        ...state,
        isPending: false,
        status: action.status,
        networkErrorMsg: '',
      };
    case LOGIN_NETWORK_ERROR:
      return {
        ...state,
        isPending: false,
        status: false,
        networkErrorMsg: action.networkErrorMsg,
      };
    case LOGOUT:
      return {
        ...state,
        isPending: false,
        status: false,
        networkErrorMsg: '',
      };
    default:
      return state;
  }
}
