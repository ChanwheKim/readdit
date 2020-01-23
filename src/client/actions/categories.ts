import axios from "axios";
import { Dispatch } from "redux";
import {FETCH_ARTICLES_BY_CATEGORY, FETCH_CATEGORIES, LOADING_ARTICLES} from "./types";

export interface Categories {
  articleIds: string[],
  _id: string,
  name: string,
  count: number,
}

export interface Article {
  keywords: string[],
  like: string[],
  categoryId: string[],
  _id: string,
  title: string,
  url: string,
  userId: string,
  image: string,
  description: string,
  author: string,
  createdAt: string,
  updatedAt: string,
}

export const fetchCategories = () => async (dispatch: Dispatch) => {
  const res = await axios.get<Categories>('/api/categories');

  dispatch({ type: FETCH_CATEGORIES, payload: res.data });
};

export const fetchArticlesByCategory = categoryId => async (dispatch) => {
  dispatch({ type: LOADING_ARTICLES, payload: true });

  const res = await axios.get<Article>(`/api/categories/${categoryId}/articles`);

  dispatch({ type: FETCH_ARTICLES_BY_CATEGORY, payload: res.data });
};
