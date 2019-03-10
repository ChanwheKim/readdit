import axios from 'axios';
import {
  FETCH_USER,
  FETCH_CATEGORIES,
  IS_POSTING,
  RECEIVE_NEW_ARTICLE,
  DISPLAY_MODAL,
  REMOVE_MODAL,
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

export const removeMmodal = () => ({
  type: REMOVE_MODAL,
  payload: '',
});
