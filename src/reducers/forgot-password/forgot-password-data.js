// POST to API
export const POST_APILOADING = '[FORGOTPWD_DATA] POST_APILOADING';
export const POST_FORGOTPWD = '[FORGOTPWD_DATA] POST_FORGOTPWD';
export const POST_ERROR = '[FORGOTPWD_DATA] POST_ERROR';
// end

export const postForgotPwd = email => ({
  type: POST_FORGOTPWD,
  email,
});

export default function (
  state = {
    isPostApiLoading: false,
    postErrMsg: null,
    email: null,
  },
  action,
) {
  switch (action.type) {
    case POST_FORGOTPWD:
      return {
        ...state,
        ...action.email,
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
