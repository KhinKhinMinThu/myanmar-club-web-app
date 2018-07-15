import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import loginReducer from './login';
import signupReducer from './signup';
import routerReducer from './router';
import rolemgmtReducer from './rolemgmt';
<<<<<<< HEAD
import accmgmtReducer from './accmgmt';

=======
>>>>>>> menu-page
/**
 * LocalStorage: storage engine for storing redux state
 * autoMergeLevel2: when restoring state during app launch,
 * this will check initial state and overrides it,
 * else it will replace initial state without checking (ignoring possible new entries)
 */
const loginPersistConfig = {
  key: 'login',
  storage: localStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['isLoggedIn'],
};

const rootReducer = combineReducers({
  login: persistReducer(loginPersistConfig, loginReducer),
  signup: signupReducer,
  rolemgmt: rolemgmtReducer,
<<<<<<< HEAD
  accmgmt: accmgmtReducer,
=======
>>>>>>> menu-page
  router: routerReducer,
});

export default rootReducer;
