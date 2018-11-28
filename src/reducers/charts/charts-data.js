export const GET_CHARTSDATA = '[CHARTS_DATA] GET_CHARTDATA';
export const CHARTSDATA = '[CHARTS_DATA] CHARTSDATA';
export const GET_APILOADING = '[CHARTS_DATA] GET_APILOADING';
export const GET_ERROR = '[CHARTS_DATA] GET_ERROR';

export const getChartsData = () => ({ type: GET_CHARTSDATA });

export default function (
  state = {
    isGetApiLoading: false,
    getErrMsg: null,
    chartsList: null,
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
    case CHARTSDATA:
      return {
        ...state,
        chartsList: action.payload,
      };
    default:
      return state;
  }
}
