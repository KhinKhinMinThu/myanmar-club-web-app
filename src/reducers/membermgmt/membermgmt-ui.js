export const VALIDATE_START = '[MEMBERMGMT_UI] VALIDATE_START';
export const VALIDATE_END = '[MEMBERMGMT_UI] VALIDATE_END';

export const startValidate = () => ({
  type: VALIDATE_START,
  payload: true,
});

export const endValidate = () => ({
  type: VALIDATE_END,
  payload: false,
});

export default function (
  state = {
    isValidating: false,
  },
  action,
) {
  switch (action.type) {
    case VALIDATE_START:
      return {
        ...state,
        isValidating: true,
      };
    case VALIDATE_END:
      return {
        ...state,
        isValidating: false,
      };
    default:
      return state;
  }
}
