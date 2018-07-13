export const VALIDATE = '[ROLEMGMT_UI] VALIDATE';

export const validate = isValidating => ({
  type: VALIDATE,
  payload: isValidating,
});

export default function (
  state = {
    isValidating: false,
  },
  action,
) {
  switch (action.type) {
    case VALIDATE:
      return {
        ...state,
        isValidating: action.payload,
      };
    default:
      return state;
  }
}
