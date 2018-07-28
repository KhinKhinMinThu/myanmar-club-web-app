import { combineReducers } from 'redux';
import ui from './event-transaction-ui';
import data from './event-transaction-data';

export default combineReducers({
  ui,
  data,
});
