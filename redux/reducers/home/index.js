import { combineReducers } from 'redux';
import channel from './channel';
import topic from './topic';

export default combineReducers({
  channel,
  topic
});