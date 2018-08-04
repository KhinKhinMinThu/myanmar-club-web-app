export const VALIDATE = '[EVENTMGMT_UI] VALIDATE';
export const SELECTEDKEYS = '[EVENTMGMT_UI] SELECTEDKEYS';
export const DESELECTALL_LOADING = '[EVENTMGMT_UI] DESELECTALL_LOADING';
export const SELECTALL_LOADING = '[EVENTMGMT_UI] SELECTALL_LOADING';
export const SORTEDINFO = '[EVENTMGMT_UI] SORTEDINFO';
export const RESETSTATE = '[EVENTMGMT_UI] RESETSTATE';

export const validate = isValidating => ({
  type: VALIDATE,
  payload: isValidating,
});

export const setSelectedKeys = selectedKeys => ({
  type: SELECTEDKEYS,
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

export const resetState = () => ({ type: RESETSTATE });

const initialState = {
  isValidating: false,
  selectedKeys: [],
  deselectAllLoading: false,
  selectAllLoading: false,
  sortedInfo: null,
};
export default function (
  state = {
    ...initialState,
  },
  action,
) {
  switch (action.type) {
    case VALIDATE:
      return {
        ...state,
        isValidating: action.payload,
      };
    case SELECTEDKEYS:
      return {
        ...state,
        selectedKeys: action.payload,
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
    case RESETSTATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
