import * as fromUserInfo from '../reducers/user-info';

export const getAllData = state => fromUserInfo.getAllData(state.userInfo);
export const getCurrentStep = state => fromUserInfo.getCurrentStep(state.userInfo);
export const getIsValidating = state => fromUserInfo.getIsValidating(state.userInfo);
export const getIsReligionOther = state => fromUserInfo.getIsReligionOther(state.userInfo);
export const getIsNationaltiyOther = state => fromUserInfo.getIsNationaltiyOther(state.userInfo);
