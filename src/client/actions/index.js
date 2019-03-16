import axios from 'axios';
import {
  FETCH_USER,
  FETCH_CATEGORIES,
  IS_POSTING,
  RECEIVE_NEW_ARTICLE,
  RESET_NEW_ARTICLE,
  DISPLAY_MODAL,
  REMOVE_MODAL,
  FETCH_ARTICLES_BY_CATEGORY,
  LOADING_ARTICLES,
  HANDLE_LIKE,
  RECEIVE_USER_POSTS,
  RECEIVE_POSTS_BY_KEYWORD,
} from './types';

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchCategories = () => async (dispatch) => {
  const res = await axios.get('/api/categories');

  dispatch({ type: FETCH_CATEGORIES, payload: res.data });
};

export const didPostRequest = () => ({
  type: IS_POSTING,
  payload: true,
});

export const receiveNewArticle = newArticle => ({
  type: RECEIVE_NEW_ARTICLE,
  payload: newArticle,
});

export const resetNewArticle = () => ({
  type: RESET_NEW_ARTICLE,
  payload: {},
});

export const displayModal = message => ({
  type: DISPLAY_MODAL,
  payload: message,
});

export const removeModal = () => ({
  type: REMOVE_MODAL,
  payload: '',
});

export const fetchArticlesByCategory = categoryId => async (dispatch) => {
  dispatch({ type: LOADING_ARTICLES, payload: true });

  const res = await axios.get(`/api/categories/${categoryId}/articles`);

  dispatch({ type: FETCH_ARTICLES_BY_CATEGORY, payload: res.data });
};

export const handleLikeClick = article => async (dispatch, getState) => {
  const user = getState().auth;

  if (!user) {
    return dispatch(displayModal('Please sign in first.'));
  }

  const likedBefore = user.like.some((id) => {
    for (let i = 0; i < article.like.length; i++) {
      return id === article.like[i];
    }
  });

  const method = likedBefore ? 'delete' : 'post';
  let res;

  try {
    res = await axios({
      method,
      url: `/api/users/${user._id}/articles/${article._id}/like`,
    });
  } catch (err) {
    return dispatch(displayModal(err.message));
  }

  dispatch({ type: HANDLE_LIKE, payload: res.data });
};

export const receiveUserPosts = articles => ({
  type: RECEIVE_USER_POSTS,
  payload: articles,
});

export const handleKeywordSearch = text => async (dispatch) => {
  const keyword = text.replace(/[^a-zA-Z0-9\u3131-\uD79D]/g, '');
  let res;

  if (!keyword || keyword.length === 1) {
    return;
  }

  try {
    res = await axios.get(`/api/articles/${keyword}`);
  } catch (err) {
    return dispatch(displayModal(err.message));
  }

  dispatch({ type: RECEIVE_POSTS_BY_KEYWORD, payload: res.data });
};
