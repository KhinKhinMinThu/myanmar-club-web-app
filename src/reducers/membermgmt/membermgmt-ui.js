export const CURRENTTAB = '[MEMBERMGMT_UI] CURRENTTAB';
export const SELECTEDKEYS = '[MEMBERMGMT_UI] SELECTEDKEYS';
export const DESELECTALL_LOADING = '[MEMBERMGMT_UI] DESELECTALL_LOADING';
export const SELECTALL_LOADING = '[MEMBERMGMT_UI] SELECTALL_LOADING';
export const SORTEDINFO = '[MEMBERMGMT_UI] SORTEDINFO';
export const FILTEREDINFO = '[MEMBERMGMT_UI] FILTEREDINFO';
export const RESETSTATE = '[MEMBERMGMT_UI] RESETSTATE';

// signup page
export const SIGNUP_NEXT = '[MEMBERMGMT_UI] SIGNUP_NEXT';
export const SIGNUP_PREV = '[MEMBERMGMT_UI] SIGNUP_PREV';

export const next = () => ({ type: SIGNUP_NEXT });
export const prev = () => ({ type: SIGNUP_PREV });

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
  isValidating: false,
  validationStatus: false,
  currentStep: 0,

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
    case SIGNUP_NEXT:
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };
    case SIGNUP_PREV:
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };
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
