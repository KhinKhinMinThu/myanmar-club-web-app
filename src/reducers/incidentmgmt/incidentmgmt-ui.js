export const SELECTEDKEYS = '[INCIDENTMGMT_UI] SELECTEDKEYS';
export const DESELECTALL_LOADING = '[INCIDENTMGMT_UI] DESELECTALL_LOADING';
export const SELECTALL_LOADING = '[INCIDENTMGMT_UI] SELECTALL_LOADING';
export const SORTEDINFO = '[INCIDENTMGMT_UI] SORTEDINFO';
export const FILTEREDINFO = '[INCIDENTMGMT_UI] FILTEREDINFO';
export const RESETSTATE = '[INCIDENTMGMT_UI] RESETSTATE';

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

export const setSortedInfo = sortedInfo => ({
  type: SORTEDINFO,
  payload: sortedInfo,
});

export const setFilteredInfo = filteredInfo => ({
  type: FILTEREDINFO,
  payload: filteredInfo,
});

export const resetState = () => ({ type: RESETSTATE });

const initialState = {
  isValidating: false,
  selectedKeys: [],
  deselectAllLoading: false,
  selectAllLoading: false,
  sortedInfo: null,
  filteredInfo: null,
};
export default function (
  state = {
    ...initialState,
  },
  action,
) {
  switch (action.type) {
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
    case FILTEREDINFO:
      return {
        ...state,
        filteredInfo: action.payload,
      };
    case RESETSTATE:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}
