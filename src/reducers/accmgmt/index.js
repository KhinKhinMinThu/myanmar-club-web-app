import { combineReducers } from 'redux';
import ui from './accmgmt-ui';
import data from './accmgmt-data';

export default combineReducers({
  ui,
  data,
});
