export const VALIDATE = '[ACCESSCONTROL_UI] VALIDATE';
export const SORTEDINFO = '[ACCESSCONTROL_UI] SORTEDINFO';
export const FILTEREDINFO = '[ACCESSCONTROL_UI] FILTEREDINFO';
export const RESETSTATE = '[ACCESSCONTROL_UI] RESETSTATE';
export const EXPANDEDROWKEYS = '[ACCESSCONTROL_UI] EXPANDEDROWKEYS';
export const DUMMYTRANSAC = '[ACCESSCONTROL_UI] DUMMYTRANSAC';
export const EDITINGKEY = '[ACCESSCONTROL_UI] EDITINGKEY';
export const SELECTEDKEYS = '[ACCESSCONTROL_UI] SELECTEDKEYS';
export const DESELECTALL_LOADING = '[ACCESSCONTROL_UI] DESELECTALL_LOADING';
export const SELECTALL_LOADING = '[ACCESSCONTROL_UI] SELECTALL_LOADING';

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

export const setSortedInfo = sortedInfo => ({
  type: SORTEDINFO,
  payload: sortedInfo,
});

export const setFilteredInfo = filteredInfo => ({
  type: FILTEREDINFO,
  payload: filteredInfo,
});

export const resetState = () => ({ type: RESETSTATE });

export const setExpandedRowKeys = expandedRowKeys => ({
  type: EXPANDEDROWKEYS,
  payload: expandedRowKeys,
});

export const setDummyTransac = index => ({
  type: DUMMYTRANSAC,
  payload: index,
});

export const setEditingKey = editingKey => ({
  type: EDITINGKEY,
  payload: editingKey,
});

const initialState = {
  isValidating: false,
  sortedInfo: null,
  filteredInfo: null,
  selectedKeys: [],
  expandedRowKeys: [],
  dummyTransacIndex: 0,
  editingKey: null,
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
    case EXPANDEDROWKEYS:
      return {
        ...state,
        expandedRowKeys: action.payload,
      };
    case DUMMYTRANSAC:
      return {
        ...state,
        dummyTransacIndex: action.payload,
      };
    case EDITINGKEY:
      return {
        ...state,
        editingKey: action.payload,
      };
    case RESETSTATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
