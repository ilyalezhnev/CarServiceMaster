import { combineReducers } from 'redux';
import { anyReducer } from './anyReducer';

export type RootState = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
  todos: anyReducer,
});
