export const SAVE = '[FORGOTPWD_DATA] SAVE';

export const save = values => ({
  type: SAVE,
  payload: values,
});

export default function (
  state = {
    email: null,
  },
  action,
) {
  switch (action.type) {
    case SAVE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
