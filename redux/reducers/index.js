import { combineReducers } from 'redux';
import topic from './topic';
import user from './user';

export default combineReducers({
  user,
  topic
});