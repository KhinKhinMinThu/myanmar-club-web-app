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
import { DASHBOARD, LOGIN } from '../actions/location';
import { APIPOST_LOGIN } from '../actions/constants';

const postLogin = userData => api
  .post(APIPOST_LOGIN, {
    username: userData.username,
    password: userData.password,
  })
  .then((response) => {
    console.log('res:', response);
    return response;
  });

function* asyncLogin(action) {
  let errMsg;
  let successLogin = false;
  try {
    yield put({ type: POST_APILOADING, payload: true });

    console.log('Calling API.........', action.type, action.userData);
    const response = yield call(postLogin, action.userData);
    console.log('API RESPONSE.........', response);

    const {
      isLoggedIn, isAdmin, token, errorMsg,
    } = response.data;
    errMsg = errorMsg;

    successLogin = isLoggedIn;

    if (isLoggedIn) {
      yield put({ type: ISLOGGEDIN, payload: isLoggedIn });
      yield put({ type: ISADMIN, payload: isAdmin });
      yield put({ type: TOKEN, payload: token });

      // axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      localStorage.setItem('loginState', JSON.stringify(response.data));
    }
  } catch (e) {
    errMsg = e.message;
  } finally {
    yield put({ type: POST_ERROR, payload: errMsg });
    yield put({ type: POST_APILOADING, payload: false });
    if (successLogin) {
      yield put(push(DASHBOARD));
    } else {
      yield put(push(LOGIN));
    } // login path; // home path
  }
}

export default takeLatest(POST_LOGIN, asyncLogin);
