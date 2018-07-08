export const NEXT = '[SIGNUP_UI] NEXT';
export const PREV = '[SIGNUP_UI] PREV';
export const VALIDATE = '[SIGNUP_UI] VALIDATE';

export const next = () => ({ type: NEXT });
export const prev = () => ({ type: PREV });
export const validate = isValidating => ({
  type: VALIDATE,
  payload: isValidating,
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
    case VALIDATE:
      return {
        ...state,
        isValidating: action.payload,
      };
    default:
      return state;
  }
}
