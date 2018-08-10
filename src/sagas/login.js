import { put, call, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  LOGIN, LOGIN_PENDING, LOGIN_ERROR, LOGGEDIN,
} from '../reducers/login';
import api from './api';
import { DASHBOARD } from '../actions/location';

const postLogin = userData => api.post('/login', {
  username: userData.username,
  password: userData.password,
});

function* asyncLogin(action) {
  let errMsg;
  try {
    yield put({ type: LOGIN_PENDING });
    console.log('Calling API.........', action.type, action.userData);
    const response = yield call(postLogin, action.userData);
    const status = response.data.isLoggedIn;
    errMsg = status ? '' : 'wrong username/password';
    yield put({ type: LOGGEDIN, payload: status });
  } catch (e) {
    errMsg = e.message;
  } finally {
    yield put({ type: LOGIN_ERROR, errMsg });
    yield put(push(DASHBOARD)); // home path
  }
}

export default takeLatest(LOGIN, asyncLogin);
