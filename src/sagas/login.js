import { put, call, takeLatest } from 'redux-saga/effects';
import { LOGIN, LOGIN_PENDING, LOGIN_ERROR } from '../reducers/login';
import api from './api';

const postLogin = userData => api.post('/login', {
  username: userData.username,
  password: userData.password,
});

function* asyncLogin(action) {
  let errMsg;
  try {
    yield put({ type: LOGIN_PENDING });
    const response = yield call(postLogin, action.userData);
    const status = response.data.isLoggedIn;
    errMsg = status ? '' : 'wrong username/password';
  } catch (e) {
    errMsg = e.message;
  } finally {
    yield put({ type: LOGIN_ERROR, errMsg });
  }
}

export default takeLatest(LOGIN, asyncLogin);
