import { combineReducers } from 'redux';
import ui from './rolemgmt-ui';
import data from './rolemgmt-data';

export default combineReducers({
  ui,
  data,
});
