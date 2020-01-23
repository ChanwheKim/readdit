import axios from "axios";
import { Dispatch } from "redux";
import { FETCH_ARTICLES_BY_CATEGORY, LOADING_ARTICLES } from "./types";

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

export const fetchArticlesByCategory = categoryId => async (dispatch: Dispatch) => {
  dispatch({ type: LOADING_ARTICLES, payload: true });

  const res = await axios.get<Article>(`/api/categories/${categoryId}/articles`);

  dispatch({ type: FETCH_ARTICLES_BY_CATEGORY, payload: res.data });
};
