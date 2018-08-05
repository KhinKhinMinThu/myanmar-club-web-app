export const VALIDATE = '[EVENTMGMT_UI] VALIDATE';
export const SELECTEDKEYS = '[EVENTMGMT_UI] SELECTEDKEYS';
export const DESELECTALL_LOADING = '[EVENTMGMT_UI] DESELECTALL_LOADING';
export const SELECTALL_LOADING = '[EVENTMGMT_UI] SELECTALL_LOADING';
export const SORTEDINFO = '[EVENTMGMT_UI] SORTEDINFO';
export const FILTEREDINFO = '[EVENTMGMT_UI] FILTEREDINFO';
export const MODALVISIBILITY = '[EVENTMGMT_UI] MODALVISIBILITY';
export const RESETSTATE = '[EVENTMGMT_UI] RESETSTATE';
export const FILELIST = '[EVENTMGMT_UI] FILELIST';

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

export const setModalVisibility = payload => ({
  type: MODALVISIBILITY,
  payload,
});

export const setFileList = fileList => ({
  type: FILELIST,
  payload: fileList,
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
  photoLink: '',
  fileList: [
    // testing purpose, to be deleted later
    // {
    //   uid: -1,
    //   name: 'xxx.png',
    //   status: 'done',
    //   url:
    //     'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
  ],
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
        ...action.payload,
      };
    case FILELIST:
      return {
        ...state,
        fileList: action.payload,
      };
    case RESETSTATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
