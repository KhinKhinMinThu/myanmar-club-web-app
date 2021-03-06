export const CURRENTTAB = '[CLAIMMGMT_UI] CURRENTTAB';
export const SELECTEDKEYS = '[CLAIMMGMT_UI] SELECTEDKEYS';
export const DESELECTALL_LOADING = '[CLAIMMGMT_UI] DESELECTALL_LOADING';
export const SELECTALL_LOADING = '[CLAIMMGMT_UI] SELECTALL_LOADING';
export const SORTEDINFO = '[CLAIMMGMT_UI] SORTEDINFO';
export const FILTEREDINFO = '[CLAIMMGMT_UI] FILTEREDINFO';
export const RESETSTATE = '[CLAIMMGMT_UI] RESETSTATE';

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

export const resetState = () => ({ type: RESETSTATE });

const initialState = {
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
    default:
      return state;
  }
}
