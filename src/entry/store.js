import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension'; // eslint-disable-line import/no-extraneous-dependencies
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, logger)),
);
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
