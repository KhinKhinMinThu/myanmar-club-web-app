import axios from 'axios';
import { select } from 'redux-saga/effects';
import { BASE_URL } from '../actions/constants';

export const api = axios.create({
  timeout: 5000,
  baseURL: BASE_URL,
  // headers: {
  //   'content-type': 'application/json',
  //   // Authorization: `Bearer ${state.login.data.token}`,
  //   Authorization: 'Bearer ABC',
  // },
});

export const apiMultiPart = axios.create({
  timeout: 5000,
  baseURL: BASE_URL,
  headers: {
    'content-type': 'multipart/form-data',
  },
});
// end after logged in

export function* getAuthHeader() {
  const loginState = state => state.login.data;
  const loginData = yield select(loginState);
  const headers = {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${loginData.token}`,
    },
  };
  return headers;
}

api.interceptors.request.use((request) => {
  console.log('Starting Request', request);
  return request;
});

apiMultiPart.interceptors.request.use((request) => {
  console.log('Starting Request Multipart', request);
  return request;
});
