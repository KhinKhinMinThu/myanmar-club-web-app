import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import loginReducer from './login';
import routerReducer from './router';
import rolemgmtReducer from './rolemgmt';
import membermgmtReducer from './membermgmt';
import claimmgmtReducer from './claimmgmt';
import eventTransactionReducer from './event-transaction';
import forgotPasswordReducer from './forgot-password';
import eventmgmtReducer from './eventmgmt';
import accessControlReducer from './access-control';
import incidentmgmtReducer from './incidentmgmt';

/**
 * LocalStorage: storage engine for storing redux state
 * autoMergeLevel2: when restoring state during app launch,
 * this will check initial state and overrides it,
 * else it will replace initial state without checking (ignoring possible new entries)
 */
export const loginPersistConfig = {
  key: 'login',
  storage: localStorage,
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  login: persistReducer(loginPersistConfig, loginReducer),

  forgotpassword: forgotPasswordReducer,
  rolemgmt: rolemgmtReducer,
  membermgmt: membermgmtReducer,
  claimmgmt: claimmgmtReducer,
  eventTransaction: eventTransactionReducer,
  eventmgmt: eventmgmtReducer,
  router: routerReducer,
  accessControl: accessControlReducer,
  incidentmgmt: incidentmgmtReducer,
});

export default rootReducer;
