import { put, call, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { api } from './api';
import {
  POST_LOGIN,
  ISLOGGEDIN,
  ISADMIN,
  TOKEN,
  POST_APILOADING,
  POST_ERROR,
} from '../reducers/login/login-data';
import { DASHBOARD } from '../actions/location';
import { APIPOST_LOGIN } from '../actions/constants';

const postLogin = userData => api.post(APIPOST_LOGIN, {
  username: userData.username,
  password: userData.password,
});

function* asyncLogin(action) {
  let errMsg;
  try {
    yield put({ type: POST_APILOADING, payload: true });

    console.log('Calling API.........', action.type, action.userData);

    const response = yield call(postLogin, action.userData);
    const {
      isLoggedIn, isAdmin, token, errorMsg,
    } = response.data;

    if (isLoggedIn) {
      yield put({ type: ISLOGGEDIN, payload: isLoggedIn });
      yield put({ type: ISADMIN, payload: isAdmin });
      yield put({ type: TOKEN, payload: token });
    }
    errMsg = errorMsg;
  } catch (e) {
    errMsg = e.message;
  } finally {
    yield put({ type: POST_ERROR, payload: errMsg });
    yield put({ type: POST_APILOADING, payload: false });
    yield put(push(DASHBOARD)); // home path
  }
}

export default takeLatest(POST_LOGIN, asyncLogin);
