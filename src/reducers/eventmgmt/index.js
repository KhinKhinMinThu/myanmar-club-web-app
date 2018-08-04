import { combineReducers } from 'redux';
import ui from './eventmgmt-ui';
import data from './eventmgmt-data';

export default combineReducers({
  ui,
  data,
});
