import { combineReducers } from 'redux';
import ui from './claimmgmt-ui';
import data from './claimmgmt-data';

export default combineReducers({
  ui,
  data,
});
