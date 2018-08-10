export const VALIDATE = '[ACCMGMT_UI] VALIDATE';
export const SELECTEDKEYS = '[ACCMGMT_UI] SELECTEDKEYS';
export const DESELECTALL_LOADING = '[ACCMGMT_UI] DESELECTALL_LOADING';
export const SELECTALL_LOADING = '[ACCMGMT_UI] SELECTALL_LOADING';
export const SORTEDINFO = '[ACCMGMT_UI] SORTEDINFO';
export const FILTEREDINFO = '[ACCMGMT_UI] FILTEREDINFO';
export const MODALVISIBILITY = '[ACCMGMT_UI] MODALVISIBILITY';
export const VIEWMEMBER = '[ACCMGMT_UI] VIEWMEMBER';
export const RESETSTATE = '[ACCMGMT_UI] RESETSTATE';

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

export const setFilteredInfo = filteredInfo => ({ type: FILTEREDINFO, payload: filteredInfo });

export const setModalVisibility = isModalVisible => ({
  type: MODALVISIBILITY,
  payload: isModalVisible,
});

export const setViewMember = viewMember => ({
  type: VIEWMEMBER,
  payload: viewMember,
});

export const resetState = () => ({ type: RESETSTATE });

const initialState = {
  isValidating: false,
  selectedKeys: [],
  deselectAllLoading: false,
  selectAllLoading: false,
  sortedInfo: null,
  filteredInfo: null,
  isModalVisible: false,
  viewMember: [],
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
    case FILTEREDINFO:
      return {
        ...state,
        filteredInfo: action.payload,
      };
    case MODALVISIBILITY:
      return {
        ...state,
        isModalVisible: action.payload,
      };
    case VIEWMEMBER:
      return {
        ...state,
        viewMember: action.payload,
      };
    case RESETSTATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
