export const NEXT = '[SIGNUP_UI] NEXT';
export const PREV = '[SIGNUP_UI] PREV';
export const START_VALIDATE = '[SIGNUP_UI] START_VALIDATE';
export const END_VALIDATE = '[SIGNUP_UI] END_VALIDATE';

export const next = () => ({ type: NEXT });
export const prev = () => ({ type: PREV });

export const startValidate = () => ({
  type: START_VALIDATE,
  payload: true,
});

export const endValidate = () => ({
  type: END_VALIDATE,
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
    case START_VALIDATE:
      return {
        ...state,
        isValidating: true,
      };
    case END_VALIDATE:
      return {
        ...state,
        isValidating: false,
      };
    default:
      return state;
  }
}

export const getCurrentStep = state => state.currentStep;
export const getIsValidating = state => state.isValidating;
