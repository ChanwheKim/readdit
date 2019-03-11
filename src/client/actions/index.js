import axios from 'axios';
import {
  FETCH_USER,
  FETCH_CATEGORIES,
  IS_POSTING,
  RECEIVE_NEW_ARTICLE,
  DISPLAY_MODAL,
  REMOVE_MODAL,
  FETCH_ARTICLES_BY_CATEGORY,
  RESET_ARTICLES_STATE,
  LOADING_ARTICLES,
  HANDLE_LIKE,
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

export const resetArticlesState = () => (dispatch) => {
  dispatch({
    type: RESET_ARTICLES_STATE,
    payload: {
      isLoading: false,
      articles: [],
    }
  });
};

export const handleLikeClick = (user, article) => async (dispatch) => {
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
      url: `/api/users/${user._id}/articles/${article._id}/like`
    });
  } catch (err) {
    return dispatch(displayModal(err.message));
  }

  dispatch({ type: HANDLE_LIKE, payload: res.data });
};
