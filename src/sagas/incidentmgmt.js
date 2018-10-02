import { put, call, takeLatest } from 'redux-saga/effects';
// import { push } from 'connected-react-router';
import { api, getAuthHeader } from './api';
import {
  GET_SEARCHPARAM,
  INCIDENTTYPES,
  SUBMITTEDBY,
  INCIDENTS,
  INCIDENT,
  GET_INCIDENT,
  GET_APILOADING,
  GET_ERROR,
  POST_SEARCHINCIDENTS,
  POST_DELETEINCIDENTS,
  POST_UPDATEINCIDENT,
  POST_NEWINCIDENT,
  POST_APILOADING,
  POST_ERROR,
} from '../reducers/incidentmgmt/incidentmgmt-data';
import {
  APIGET_INCIDENTTPYES,
  APIGET_SUBMITTEDBY,
  APIPOST_SEARCH_INCIDENTS,
  APIPOST_DELETE_INCIDENTS,
  APIPOST_ADD_INCIDENT,
  APIGET_INCIDENT,
  APIPOST_UPDATE_INCIDENT,
} from '../actions/constants';
// import { INCIDENT_MANAGMENT } from '../actions/location';

// GET REQUEST
const getIncidentTypes = authHeader => api.get(APIGET_INCIDENTTPYES, authHeader);
const getSubmittedBy = authHeader => api.get(APIGET_SUBMITTEDBY, authHeader);
// POST TO GET DATA -.-
const getIncident = (id, authHeader) => api.post(APIGET_INCIDENT, id, authHeader);
// POST REQUEST
const postSearchIncidents = (searchParams, authHeader) => api.post(APIPOST_SEARCH_INCIDENTS, searchParams, authHeader);

function* asyncGetIncidentData(action) {
  let errMsg;
  let response;
  try {
    const authHeader = yield call(getAuthHeader);
    yield put({ type: GET_APILOADING, payload: true });

    response = yield call(getIncidentTypes, authHeader);
    if (response) {
      const { incidentTypes } = response.data;
      if (incidentTypes) yield put({ type: INCIDENTTYPES, payload: incidentTypes });
    }

    response = yield call(getIncident, action.id, authHeader);
    if (response) {
      const { incident, errorMsg } = response.data;

      // delete below
      // const incident = {
      //   id: '1',
      //   name: 'incident name',
      //   requesterName: 'helper Oo',
      //   requesterAge: '21-25',
      //   incidentTypeId: '-1',
      //   incidentType: 'abc type',
      //   description: 'abcd',
      //   createdDate: '2010-10-01',
      //   createdBy: 'Ye Myint', // return name
      //   updatedDate: '2010-11-01',
      //   updatedBy: 'Wai Yan', // return name
      // };
      // errMsg = '';
      // end detele

      errMsg = errorMsg;
      yield put({ type: INCIDENT, payload: incident });
    }
  } catch (e) {
    errMsg = e.message;
  } finally {
    yield put({ type: GET_ERROR, payload: errMsg });
    yield put({ type: GET_APILOADING, payload: false });
  }
}

function* asyncGetIncidentsData() {
  let errMsg;
  let response;
  try {
    const authHeader = yield call(getAuthHeader);
    yield put({ type: GET_APILOADING, payload: true });

    response = yield call(getIncidentTypes, authHeader);
    const { incidentTypes } = response.data;

    // delete below line
    // const incidentTypes = [
    //   { id: '1', name: 'Abuse' },
    //   { id: '2', name: 'Run Away' },
    // ];
    // end delete
    if (incidentTypes) yield put({ type: INCIDENTTYPES, payload: incidentTypes });

    response = yield call(getSubmittedBy, authHeader);
    const { submittedBy } = response.data;

    // delete below line
    // const submittedBy = [
    //   { id: '1', name: 'Ye Myint' },
    //   { id: '2', name: 'Ya Min' },
    // ];
    // end delete

    if (submittedBy) yield put({ type: SUBMITTEDBY, payload: submittedBy });

    // initial data
    response = yield call(postSearchIncidents, { default: '1' }, authHeader);
    yield put({ type: INCIDENTS, payload: response.data.incidents });

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

const postDeleteIncidents = (incidentsToDelete, authHeader) => api.post(APIPOST_DELETE_INCIDENTS, incidentsToDelete, authHeader);

const postNewIncident = (newIncidentToAdd, authHeader) => api.post(APIPOST_ADD_INCIDENT, newIncidentToAdd, authHeader);

const postUpdateIncident = (incidetToUpdate, authHeader) => api.post(APIPOST_UPDATE_INCIDENT, incidetToUpdate, authHeader);
function* asyncPostProcessIncident(action) {
  let errMsg;
  try {
    const authHeader = yield call(getAuthHeader);
    yield put({ type: POST_APILOADING, payload: true });
    let response;

    console.log(
      'Calling API.........',
      action.type,
      action.searchParams,
      action.incidentsToDelete,
      action.newIncidentToAdd,
      action.incidentToUpdate,
    );

    switch (action.type) {
      case POST_SEARCHINCIDENTS:
        response = yield call(
          postSearchIncidents,
          action.searchParams,
          authHeader,
        );
        yield put({ type: INCIDENTS, payload: response.data.incidents });

        break;
      case POST_DELETEINCIDENTS:
        response = yield call(
          postDeleteIncidents,
          action.incidentsToDelete,
          authHeader,
        );
        break;
      case POST_NEWINCIDENT:
        response = yield call(
          postNewIncident,
          action.newIncidentToAdd,
          authHeader,
        );
        break;
      case POST_UPDATEINCIDENT:
        response = yield call(
          postUpdateIncident,
          action.incidentToUpdate,
          authHeader,
        );
        break;
      default:
    }

    const { errorMsg } = response.data;
    errMsg = errorMsg;
  } catch (e) {
    errMsg = e.message;
  } finally {
    yield put({ type: POST_ERROR, payload: errMsg });
    yield put({ type: POST_APILOADING, payload: false });
    // if (action.type === POST_SEARCHINCIDENTS && !errMsg) yield put(push(INCIDENT_MANAGMENT));
  }
}
// end

export const getSearchParamSaga = takeLatest(
  GET_SEARCHPARAM,
  asyncGetIncidentsData,
);
export const postSearchIncidentSaga = takeLatest(
  POST_SEARCHINCIDENTS,
  asyncPostProcessIncident,
);
export const postDeleteIncidentsSaga = takeLatest(
  POST_DELETEINCIDENTS,
  asyncPostProcessIncident,
);
export const postNewIncidentSaga = takeLatest(
  POST_NEWINCIDENT,
  asyncPostProcessIncident,
);
export const postUpdateIncidentSaga = takeLatest(
  POST_UPDATEINCIDENT,
  asyncPostProcessIncident,
);
export const getIncidentSaga = takeLatest(GET_INCIDENT, asyncGetIncidentData);
