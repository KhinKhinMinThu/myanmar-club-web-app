export const CURRENTTAB = '[EVENTMGMT_UI] CURRENTTAB';
export const SELECTEDKEYS = '[EVENTMGMT_UI] SELECTEDKEYS';
export const DESELECTALL_LOADING = '[EVENTMGMT_UI] DESELECTALL_LOADING';
export const SELECTALL_LOADING = '[EVENTMGMT_UI] SELECTALL_LOADING';
export const SORTEDINFO = '[EVENTMGMT_UI] SORTEDINFO';
export const FILTEREDINFO = '[EVENTMGMT_UI] FILTEREDINFO';
export const SETACTION = '[EVENTMGMT_UI] SETACTION';
export const RESETSTATE = '[EVENTMGMT_UI] RESETSTATE';

export const setCurrentTab = currentTab => ({
  type: CURRENTTAB,
  payload: currentTab,
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

export const setSortedInfo = sortedInfo => ({
  type: SORTEDINFO,
  payload: sortedInfo,
});

export const setFilteredInfo = filteredInfo => ({
  type: FILTEREDINFO,
  payload: filteredInfo,
});

export const setAction = action => ({
  type: SETACTION,
  payload: action,
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
    currentTab: 'tab1',
    action: null,
  },
  action,
) {
  switch (action.type) {
    case CURRENTTAB:
      return {
        ...state,
        currentTab: action.payload,
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
    case SETACTION:
      return {
        ...state,
        action: action.payload,
      };
    default:
      return state;
  }
}
