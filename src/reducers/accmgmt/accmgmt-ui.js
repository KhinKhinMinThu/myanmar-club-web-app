export const VALIDATE = '[ACCMGMT_UI] VALIDATE';
export const EC_SELECTEDKEYS = '[ACCMGMT_UI] EC_SELECTEDKEYS';
export const DESELECTALL_LOADING = '[ACCMGMT_UI] DESELECTALL_LOADING';
export const SELECTALL_LOADING = '[ACCMGMT_UI] SELECTALL_LOADING';
export const SORTEDINFO = '[ACCMGMT_UI] SORTEDINFO';

export const validate = isValidating => ({
  type: VALIDATE,
  payload: isValidating,
});

export const setECSelectedKeys = selectedKeys => ({
  type: EC_SELECTEDKEYS,
  payload: selectedKeys,
});

export const setDeSelectAllLoading = isLoading => ({
  type: DESELECTALL_LOADING,
  payload: isLoading,
});

export const setSelectAllLoading = isLoading => ({
  type: SELECTALL_LOADING,
  payload: isLoading,
});

export const setSortedInfo = sortedInfo => ({ type: SORTEDINFO, payload: sortedInfo });

export default function (
  state = {
    isValidating: false,
    ecSelectedKeys: [],
    deselectAllLoading: false,
    selectAllLoading: false,
    sortedInfo: null,
  },
  action,
) {
  switch (action.type) {
    case VALIDATE:
      return {
        ...state,
        isValidating: action.payload,
      };
    case EC_SELECTEDKEYS:
      return {
        ...state,
        ecSelectedKeys: action.payload,
      };
    case DESELECTALL_LOADING:
      return {
        ...state,
        deselectAllLoading: action.payload,
      };
    case SELECTALL_LOADING:
      return {
        ...state,
        selectAllLoading: action.payload,
      };
    case SORTEDINFO:
      return {
        ...state,
        sortedInfo: action.payload,
      };
    default:
      return state;
  }
}
