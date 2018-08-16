import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension'; // eslint-disable-line import/no-extraneous-dependencies
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
import { AUTHENTICATED_USER } from '../reducers/login/login-data';

export const history = createBrowserHistory();
const rtrMiddleware = routerMiddleware(history); // for dispatching history actions
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  connectRouter(history)(rootReducer), // new root reducer with router state
  composeWithDevTools(applyMiddleware(sagaMiddleware, rtrMiddleware)),
);

const loginState = localStorage.getItem('loginState');
console.log('LoginState from localStorage:', loginState);
if (loginState) {
  store.dispatch({
    type: AUTHENTICATED_USER,
    payload: JSON.parse(loginState),
  });
}

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
