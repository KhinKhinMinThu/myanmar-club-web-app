import { combineReducers } from 'redux';
import ui from './access-control-ui';
import data from './access-control-data';

export default combineReducers({
  ui,
  data,
});
