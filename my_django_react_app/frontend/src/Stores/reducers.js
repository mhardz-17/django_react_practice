import { combineReducers } from 'redux';
// import leads from './leads';
// import errors from './errors';
// import messages from './messages';
import {reducer as auth} from './Auth/Reducers';

export default combineReducers({
  // leads,
  // errors,
  // messages,
  auth,
});
