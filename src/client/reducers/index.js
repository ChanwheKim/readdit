import { combineReducers } from 'redux';
import authReducer from './authReducer';
import categoryReducer from './categoryReducer';

export default combineReducers({
  auth: authReducer,
  categories: categoryReducer,
});
