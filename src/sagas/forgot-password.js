import { put, call, takeLatest } from 'redux-saga/effects';
import { api, getAuthHeader } from './api';
import {
  POST_APILOADING,
  POST_FORGOTPWD,
  POST_ERROR,
} from '../reducers/forgot-password/forgot-password-data';
import { APIPOST_FORGOTPWD } from '../actions/constants';

const postForgotPwd = (email, authHeader) => api.post(APIPOST_FORGOTPWD, email, authHeader);

function* asyncPostForgotPwd(action) {
  let errMsg;
  try {
    const authHeader = yield call(getAuthHeader);
    yield put({ type: POST_APILOADING, payload: true });

    console.log('Calling API.........', action.type, action.email);
    const response = yield call(postForgotPwd, action.email, authHeader);
    if (response) {
      const { errorMsg } = response.data;
      errMsg = errorMsg;
    }
  } catch (e) {
    errMsg = e.message;
  } finally {
    yield put({ type: POST_ERROR, payload: errMsg });
    yield put({ type: POST_APILOADING, payload: false });
    // yield put(push(RESETPASSWORD)); // home path
  }
}

export default takeLatest(POST_FORGOTPWD, asyncPostForgotPwd);
