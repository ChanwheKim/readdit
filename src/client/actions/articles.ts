import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";

export interface Article {
  keywords: string[];
  like: string[];
  categoryId: string[];
  _id: string;
  title: string;
  url: string;
  userId: string;
  image: string;
  description: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

interface FetchArticlesAction {
  type: ActionTypes.FETCH_ARTICLES_BY_CATEGORY;
  payload: Article[];
}

interface GetNewArticleAction {
  type: ActionTypes.GET_NEW_ARTICLE;
  payload: Article;
}

interface ResetNewArticleAction {
  type: ActionTypes.RESET_NEW_ARTICLE;
  payload: {},
}

interface ReceiveUserPostsAction {
  type: ActionTypes.RECEIVE_USER_POSTS;
  payload: Article[];
}

export const fetchArticlesByCategory = categoryId => async (
  dispatch: Dispatch
) => {
  dispatch({ type: ActionTypes.LOADING_ARTICLES, payload: true });

  const res = await axios.get<Article[]>(
    `/api/categories/${categoryId}/articles`
  );

  dispatch<FetchArticlesAction>({
    type: ActionTypes.FETCH_ARTICLES_BY_CATEGORY,
    payload: res.data
  });
};

export const getNewArticle = (newArticle: Article): GetNewArticleAction => ({
  type: ActionTypes.GET_NEW_ARTICLE,
  payload: newArticle
});

export const resetNewArticle = (): ResetNewArticleAction => ({
  type: ActionTypes.RESET_NEW_ARTICLE,
  payload: {}
});

export const receiveUserPosts = (articles: Article[]): ReceiveUserPostsAction => ({
  type: ActionTypes.RECEIVE_USER_POSTS,
  payload: articles
});
