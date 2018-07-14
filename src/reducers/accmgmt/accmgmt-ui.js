export const VALIDATE = '[ACCMGMT_UI] VALIDATE';
export const ECSELECTEDKEYS = '[ACCMGMT_UI] ECSELECTEDKEYS';
export const ECLOADING = '[ACCMGMT_UI] ECLOADING';

export const validate = isValidating => ({
  type: VALIDATE,
  payload: isValidating,
});

export const setECSelectedKeys = selectedKeys => ({
  type: ECSELECTEDKEYS,
  payload: selectedKeys,
});

export const setECLoading = isLoading => ({
  type: ECLOADING,
  payload: isLoading,
});

export default function (
  state = {
    isValidating: false,
    ecSelectedKeys: [],
    ecLoading: false,
  },
  action,
) {
  switch (action.type) {
    case VALIDATE:
      return {
        ...state,
        isValidating: action.payload,
      };
    case ECSELECTEDKEYS:
      return {
        ...state,
        ecSelectedKeys: action.payload,
      };
    case ECLOADING:
      return {
        ...state,
        ecLoading: action.payload,
      };
    default:
      return state;
  }
}
