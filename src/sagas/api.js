import axios from 'axios';
// import tokenProvider from 'axios-token-interceptor';
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

// api.interceptors.request.use((request) => {
//   console.log('Starting Request', request);
//   return request;
// });
