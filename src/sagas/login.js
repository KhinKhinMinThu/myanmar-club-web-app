import { put, call, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { api, getAuthHeader } from './api';
import {
  POST_LOGIN,
  LOGINDATA,
  POST_APILOADING,
  POST_ERROR,
} from '../reducers/login/login-data';
import { DASHBOARD } from '../actions/location';
import { APIPOST_LOGIN } from '../actions/constants';

const postLogin = (userData, authHeader) => api.post(
  APIPOST_LOGIN,
  {
    username: userData.username,
    password: userData.password,
  },
  authHeader,
);

function* asyncLogin(action) {
  let errMsg;
  let successLogin = false;
  try {
    const authHeader = yield call(getAuthHeader);
    yield put({ type: POST_APILOADING, payload: true });
    console.log('Calling API.........', action.type, action.userData);
    const response = yield call(postLogin, action.userData, authHeader);

    const {
      isLoggedIn,
      isEcMember,
      id,
      name,
      photo,
      roleList,
      functionList,
      token,
      errorMsg,
    } = response.data;
    errMsg = errorMsg;

    successLogin = isLoggedIn;

    const roleIdList = roleList ? roleList.map(item => item.id) : [];
    const functNameList = functionList
      ? functionList.map(item => item.path)
      : [];

    if (isLoggedIn) {
      const payload = {
        isLoggedIn,
        isEcMember,
        id,
        name,
        photo,
        roleIdList, // required for controlling RoleAssignment at MemberEdit Page for Admin
        functNameList, // required for menu & page access control
        token,
        tokenErrMsg: null,
      };
      yield put({ type: LOGINDATA, payload });

      localStorage.setItem('loginState', JSON.stringify(payload));
    }
  } catch (e) {
    errMsg = e.message;
  } finally {
    yield put({ type: POST_ERROR, payload: errMsg });
    yield put({ type: POST_APILOADING, payload: false });
    if (successLogin) {
      yield put(push(DASHBOARD));
    }
  }
}

export default takeLatest(POST_LOGIN, asyncLogin);
