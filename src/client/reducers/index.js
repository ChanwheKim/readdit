import { combineReducers } from 'redux';
import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import newArticleReducer from './newArticleReducer';
import modalReducer from './modalReducer';
import articlesReducer from './articlesReducer';

export default combineReducers({
  auth: authReducer,
  categories: categoryReducer,
  newArticle: newArticleReducer,
  modal: modalReducer,
  articles: articlesReducer,
});
