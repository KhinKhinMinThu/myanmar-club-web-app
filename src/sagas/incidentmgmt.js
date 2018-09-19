import { put, call, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { api, getAuthHeader } from './api';
import {
  GET_SEARCHPARAM,
  INCIDENTTYPES,
  SUBMITTEDBY,
  INCIDENTS,
  GET_APILOADING,
  GET_ERROR,
  POST_SEARCHINCIDENTS,
  POST_APILOADING,
  POST_ERROR,
} from '../reducers/incidentmgmt/incidentmgmt-data';
import {
  APIGET_INCIDENTTPYES,
  APIGET_SUBMITTEDBY,
  APIPOST_SEARCH_INCIDENTS,
} from '../actions/constants';
import { INCIDENT_MANAGMENT } from '../actions/location';

// GET REQUEST
const getIncidentTypes = authHeader => api.get(APIGET_INCIDENTTPYES, authHeader);
const getSubmittedBy = authHeader => api.get(APIGET_SUBMITTEDBY, authHeader);
function* asyncGetIncidentData() {
  let errMsg;
  let response;
  try {
    const authHeader = yield call(getAuthHeader);
    yield put({ type: GET_APILOADING, payload: true });

    // response = yield call(getIncidentTypes, authHeader);
    // console.log('API RESPONSE.........', response);
    // const { incidentTypes } = response.data;

    // delete below line
    const incidentTypes = [
      { id: '1', name: 'Abuse' },
      { id: '2', name: 'Run Away' },
    ];
    if (incidentTypes) yield put({ type: INCIDENTTYPES, payload: incidentTypes });

    // response = yield call(getSubmittedBy, authHeader);
    // console.log('API RESPONSE.........', response);
    // const { submittedBy } = response.data;

    // delete below line
    const submittedBy = [
      { id: '1', name: 'Ye Myint' },
      { id: '2', name: 'Ya Min' },
    ];
    if (submittedBy) yield put({ type: SUBMITTEDBY, payload: submittedBy });

    errMsg = response.data.errorMsg ? response.data.errMsg : '';
  } catch (e) {
    errMsg = e.message;
  } finally {
    yield put({ type: GET_ERROR, payload: errMsg });
    yield put({ type: GET_APILOADING, payload: false });
  }
}
// end

// POST REQUEST
const postSearchIncidents = (searchParams, authHeader) => api.post(APIPOST_SEARCH_INCIDENTS, searchParams, authHeader);

function* asyncPostProcessIncident(action) {
  let errMsg;
  try {
    const authHeader = yield call(getAuthHeader);
    yield put({ type: POST_APILOADING, payload: true });
    let response;

    console.log('Calling API.........', action.type, action.searchParams);

    switch (action.type) {
      case POST_SEARCHINCIDENTS:
        // response = yield call(
        //   postSearchIncidents,
        //   action.searchParams,
        //   authHeader,
        // );
        // delete below

        yield put({
          type: INCIDENTS,
          payload: [
            {
              id: '1',
              name: 'incident name',
              requesterName: 'helper Oo',
              requesterAge: '10-15',
              incidentType: { id: '1', name: 'Abuse' }, // if others -> { id: "-1", name: "abc" }
              description: 'abcd',
              createdDate: '2010-10-01',
              createdBy: 'Ye Myint', // return name
              updatedDate: '2010-11-01',
              updatedBy: 'Wai Yan', // return name
            },
            {
              id: '2',
              name: 'abc name',
              requesterName: 'helper Oo',
              requesterAge: '10-15',
              incidentType: { id: '1', name: 'Abuse' }, // if others -> { id: "-1", name: "abc" }
              description: 'abcd',
              createdDate: '2010-10-01',
              createdBy: 'Ye Myint', // return name
              updatedDate: '2010-11-01',
              updatedBy: 'Wai Yan', // return name
            },
          ],
        });
        // delete end
        if (response.data.incidents) yield put({ type: INCIDENTS, payload: response.data.incidents });

        break;
      default:
    }
    console.log('API RESPONSE.........', response);

    const { errorMsg } = response.data;
    errMsg = errorMsg;
  } catch (e) {
    errMsg = e.message;
  } finally {
    yield put({ type: POST_ERROR, payload: errMsg });
    yield put({ type: POST_APILOADING, payload: false });
    errMsg = ''; // delete this
    if (action.type === POST_SEARCHINCIDENTS && !errMsg) yield put(push(INCIDENT_MANAGMENT));
  }
}
// end

export const getSearchParamSaga = takeLatest(
  GET_SEARCHPARAM,
  asyncGetIncidentData,
);
export const postSearchIncidentSaga = takeLatest(
  POST_SEARCHINCIDENTS,
  asyncPostProcessIncident,
);
