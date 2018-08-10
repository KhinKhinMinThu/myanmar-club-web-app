import { put, call, takeLatest } from 'redux-saga/effects';
import api from './api';
import {
  POST_APILOADING,
  POST_FORGOTPWD,
  POST_ERROR,
} from '../reducers/forgot-password/forgot-password-data';

const postForgotPwd = email => api.post('/forgotPassword', { email });

function* asyncPostForgotPwd(action) {
  let errMsg;
  try {
    yield put({ type: POST_APILOADING, payload: true });
    let response;

    console.log('Calling API.........', action.type, action.email);
    yield call(postForgotPwd, action.email);
    const { errorMsg } = response.data;
    errMsg = errorMsg;
  } catch (e) {
    errMsg = e.message;
  } finally {
    yield put({ type: POST_ERROR, payload: errMsg });
    yield put({ type: POST_APILOADING, payload: false });
    // yield put(push(RESETPASSWORD)); // home path
  }
}

export default takeLatest(POST_FORGOTPWD, asyncPostForgotPwd);
