import axios from 'axios';
import { FETCH_USER, FETCH_CATEGORIES } from './types';

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchCategories = () => async (dispatch) => {
  const res = await axios.get('/api/categories');

  dispatch({ type: FETCH_CATEGORIES, payload: res.data });
};
