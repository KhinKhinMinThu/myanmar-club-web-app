export const VALIDATE = '[EVENTTRANSAC_UI] VALIDATE';
export const SORTEDINFO = '[EVENTTRANSAC_UI] SORTEDINFO';
export const FILTEREDINFO = '[EVENTTRANSAC_UI] FILTEREDINFO';
export const RESETSTATE = '[EVENTTRANSAC_UI] RESETSTATE';
export const EXPANDEDROWKEYS = '[EVENTTRANSAC_UI] EXPANDEDROWKEYS';
export const DUMMYTRANSAC = '[EVENTTRANSAC_UI] DUMMYTRANSAC';

export const validate = isValidating => ({
  type: VALIDATE,
  payload: isValidating,
});

export const setSortedInfo = sortedInfo => ({ type: SORTEDINFO, payload: sortedInfo });

export const setFilteredInfo = filteredInfo => ({ type: FILTEREDINFO, payload: filteredInfo });

export const resetState = () => ({ type: RESETSTATE });

export const setExpandedRowKeys = expandedRowKeys => ({
  type: EXPANDEDROWKEYS,
  payload: expandedRowKeys,
});

export const setDummyTransac = index => ({
  type: DUMMYTRANSAC,
  payload: index,
});

const initialState = {
  isValidating: false,
  sortedInfo: null,
  filteredInfo: null,
  expandedRowKeys: [],
  dummyTransacIndex: 0,
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
    case RESETSTATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
