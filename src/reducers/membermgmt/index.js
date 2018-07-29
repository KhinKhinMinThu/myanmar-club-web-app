import { combineReducers } from 'redux';
import ui from './membermgmt-ui';
import data from './membermgmt-data';

export default combineReducers({
  ui,
  data,
});
