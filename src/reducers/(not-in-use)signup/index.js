import { combineReducers } from 'redux';
import ui from './signup-ui';
import data from './signup-data';

export default combineReducers({
  ui,
  data,
});
