import axios from "axios";
import { Dispatch } from "redux";

import { Article } from "./articles";
import { ActionTypes } from "./types";
import { displayModal } from "./modal";

interface ClickLikeAction {
  type: ActionTypes.HANDLE_LIKE;
  payload: {
    like: string[] | [];
    article: Article;
  }
}

interface User {
  articleIds: string[];
  like: string[];
  emails: [];
  _id: string;
  googleId: string;
  displayName: string;
  name: { familyName: string; givenName: string };
  image: string;
}

interface FetchUserAction {
  type: ActionTypes.FETCH_USER;
  payload: User;
}

interface SearchedItem {
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

interface KeywordSearchAction {
  type: ActionTypes.RECEIVE_POSTS_BY_KEYWORD;
  payload: SearchedItem[];
}
export const didPostRequest = () => ({
  type: ActionTypes.IS_POSTING,
  payload: true
});

export const fetchUser = () => async (dispatch: Dispatch) => {
  const res = await axios.get<User>("/api/current_user");
  dispatch<FetchUserAction>({
    type: ActionTypes.FETCH_USER,
    payload: res.data
  });
};

export const handleKeywordSearch = text => async (dispatch: Dispatch) => {
  const keyword = text.replace(/[^a-zA-Z0-9\u3131-\uD79D]/g, "");

  if (!keyword || keyword.length === 1) {
    return;
  }

  const res = await axios.get<SearchedItem[]>(`/api/articles/${keyword}`);

  dispatch<KeywordSearchAction>({
    type: ActionTypes.RECEIVE_POSTS_BY_KEYWORD,
    payload: res.data
  });
};

export const handleClickLike = article => async (dispatch: Dispatch, getState) => {
  const user = getState().auth;

  if (!user) {
    return dispatch(displayModal("Please sign in first."));
  }

  const likedBefore = user.like.some(id => {
    for (let i = 0; i < article.like.length; i++) {
      return id === article.like[i];
    }
  });

  const method = likedBefore ? "delete" : "post";
  let res;

  try {
    res = await axios({
      method,
      url: `/api/users/${user._id}/articles/${article._id}/like`
    });
  } catch (err) {
    return dispatch(displayModal(err.message));
  }

  dispatch<ClickLikeAction>({ type: ActionTypes.HANDLE_LIKE, payload: res.data });
};
