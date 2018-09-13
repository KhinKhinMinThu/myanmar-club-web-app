import axios from 'axios';
import { BASE_URL } from '../actions/constants';

// const loginState = state => state.login.data;
// export function* saveProjectTask() {
//   while(true) {
//     yield take(SAVE_PROJECT);
//     let project = yield select(getProject); // <-- get the project
//     yield call(fetch, '/api/project', { body: project, method: 'PUT' });
//     yield put({type: SAVE_PROJECT_SUCCESS});
//   }
// }

// axios.defaults.headers.common.Authorization = 'Bearer ABC';
export const api = axios.create({
  timeout: 5000,
  baseURL: BASE_URL,
  headers: {
    'content-type': 'application/json',
    // Authorization: `Bearer ${state.login.data.token}`,
    // Authorization: 'Bearer ABC',
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
// export function* addTokenToHeader() {
//   const loginState = yield select(state => state.login.data);
//   const { token } = loginState;
//   console.log('token: ', token);
// This will send the "Authorization: Bearer abc" header when making the call to the API endpoint.
// if (token) {
// api.interceptors.request.use(tokenProvider({ token }));
// apiMultiPart.interceptors.request.use(tokenProvider({ token }));
// }
// }

api.interceptors.request.use((request) => {
  console.log('Starting Request', request);
  return request;
});

apiMultiPart.interceptors.request.use((request) => {
  console.log('Starting Request Multipart', request);
  return request;
});
