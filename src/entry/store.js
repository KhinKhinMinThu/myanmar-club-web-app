import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension'; // eslint-disable-line import/no-extraneous-dependencies
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import rootReducer from '../reducers';

import rootSaga from '../sagas';
import { api } from '../sagas/api';
import { TOKEN_ERROR, AUTHENTICATED_USER } from '../reducers/login/login-data';

export const history = createBrowserHistory();
const rtrMiddleware = routerMiddleware(history); // for dispatching history actions
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  connectRouter(history)(rootReducer), // new root reducer with router state
  composeWithDevTools(applyMiddleware(sagaMiddleware, logger, rtrMiddleware)),
);

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);

const loginState = localStorage.getItem('loginState');
console.log('LoginState from localStorage:', loginState);
if (loginState) {
  store.dispatch({
    type: AUTHENTICATED_USER,
    payload: JSON.parse(loginState),
  });
}

// to check if the token is valid
api.interceptors.response.use(
  (response) => {
    console.log('Getting Response', response);
    if (response.data) {
      if (response.data.access && loginState) {
        store.dispatch({
          type: TOKEN_ERROR,
          payload: response.data.access,
        });
        localStorage.clear();
      }
    }
    return response;
  },
  (error) => {
    console.log('Error', error);
    Promise.reject(error);
  },
);
