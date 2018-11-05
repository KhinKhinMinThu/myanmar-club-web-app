export const GET_TASKDATA = '[TASK_DATA] GET_TASKDATA';
export const TASKDATA = '[TASK_DATA] TASKDATA';
export const GET_APILOADING = '[TASK_DATA] GET_APILOADING';
export const GET_ERROR = '[TASK_DATA] GET_ERROR';

export const getTaskData = () => ({ type: GET_TASKDATA });

export default function (
  state = {
    isGetApiLoading: false,
    getErrMsg: null,
    taskData: [],
  },
  action,
) {
  switch (action.type) {
    case GET_APILOADING:
      return {
        ...state,
        isGetApiLoading: action.payload,
      };
    case GET_ERROR:
      return {
        ...state,
        getErrMsg: action.payload,
      };
    case TASKDATA:
      return {
        ...state,
        taskData: action.payload,
      };
    default:
      return state;
  }
}
