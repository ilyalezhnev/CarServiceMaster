import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import anyReducer from './anyReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  any: anyReducer,
});
