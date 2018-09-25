import { combineReducers } from 'redux';
import ui from './incidentmgmt-ui';
import data from './incidentmgmt-data';

export default combineReducers({
  ui,
  data,
});
