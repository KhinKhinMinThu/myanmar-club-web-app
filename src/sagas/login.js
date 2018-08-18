import { put, call, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { api } from './api';
import {
  POST_LOGIN,
  LOGINDATA,
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
      // isLoggedIn, isAdmin, token, errorMsg, id, name,
      isLoggedIn,
      isEcMember,
      id,
      name,
      roleNames,
      token,
      errorMsg,
    } = response.data;
    errMsg = errorMsg;

    successLogin = isLoggedIn;

    const roleIdList = roleNames ? roleNames.map(item => item.id) : [];
    const payload = {
      isLoggedIn,
      isEcMember,
      id,
      name,
      roleIdList,
      token,
    };
    if (isLoggedIn) {
      yield put({ type: LOGINDATA, payload });
      // axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      localStorage.setItem('loginState', JSON.stringify(payload));
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
