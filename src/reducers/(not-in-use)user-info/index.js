import { combineReducers } from 'redux';
import ui, * as fromUi from './ui';
import data, * as fromData from './data';

export default combineReducers({
  ui,
  data,
});

export const getUserInfo = state => state.data;
export const getIsReligionOther = state => fromData.getIsReligionOther(state.data);
export const getIsNationaltiyOther = state => fromData.getIsNationaltiyOther(state.data);
export const getCurrentStep = state => fromUi.getCurrentStep(state.ui);
export const getIsValidating = state => fromUi.getIsValidating(state.ui);
