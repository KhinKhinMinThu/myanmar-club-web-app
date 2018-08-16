import axios from 'axios';
// import tokenProvider from 'axios-token-interceptor';
import { select } from 'redux-saga/effects';
import { BASE_URL } from '../actions/constants';

// after logged in
export const api = axios.create({
  timeout: 5000,
  baseURL: BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
});

export const apiMultiPart = axios.create({
  timeout: 5000,
  baseURL: BASE_URL,
  headers: {
    'content-type': 'multipart/form-data',
  },
});
// end after logged in
// Saga
export function* addTokenToHeader() {
  const loginState = yield select(state => state.login.data);
  const { token } = loginState;
  console.log('token: ', token);
  // This will send the "Authorization: Bearer abc" header when making the call to the API endpoint.
  // if (token) {
  // api.interceptors.request.use(tokenProvider({ token }));
  // apiMultiPart.interceptors.request.use(tokenProvider({ token }));
  // }
}

api.interceptors.request.use((request) => {
  console.log('Starting Request', request);
  return request;
});

api.interceptors.request.use((response) => {
  console.log('Getting Response', response);
  return response;
});
