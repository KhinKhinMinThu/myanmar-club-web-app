export const NEXT = '[SIGNUP_UI] NEXT';
export const PREV = '[SIGNUP_UI] PREV';
export const VALIDATE_START = '[SIGNUP_UI] VALIDATE_START';
export const VALIDATE_END = '[SIGNUP_UI] VALIDATE_END';

export const next = () => ({ type: NEXT });
export const prev = () => ({ type: PREV });

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
    currentStep: 0,
    isValidating: false,
  },
  action,
) {
  switch (action.type) {
    case NEXT:
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };
    case PREV:
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };
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
