import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import {
  LOGIN, LOGIN_PENDING, LOGIN_STATUS, LOGIN_NETWORK_ERROR,
} from '../reducers/login';

const loginFetch = userData => axios({
  method: 'post',
  url: 'http://10.1.52.193:8080/pentaho/j_spring_security_check',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  params: {
    j_username: userData.username,
    j_password: userData.password,
  },
});

function* fetchLoginAsync(action) {
  try {
    yield put({ type: LOGIN_PENDING });
    const response = yield call(loginFetch, action.userData);
    const status = !response.request.responseURL.includes('login_error');
    yield put({ type: LOGIN_STATUS, status });
  } catch (e) {
    const networkErrorMsg = e.message;
    yield put({ type: LOGIN_NETWORK_ERROR, networkErrorMsg });
  }
}

export default takeLatest(LOGIN, fetchLoginAsync);
