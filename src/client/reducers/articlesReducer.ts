import { ActionTypes } from "../actions/types";

const initialState = {
  isLoading: false,
  list: {}
};

export default function articlesReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOADING_ARTICLES:
      return {
        ...state,
        isLoading: action.payload
      };
    case ActionTypes.FETCH_ARTICLES_BY_CATEGORY:
      const newArticles = action.payload.reduce((articles, item) => {
        if (!Object.keys(state.list).includes(item._id)) {
          articles[item._id] = item;
        }

        return articles;
      }, {});

      return {
        isLoading: false,
        list: {
          ...state.list,
          ...newArticles
        }
      };
    case ActionTypes.RECEIVE_USER_POSTS:
      const userArticles = action.payload.reduce((articles, item) => {
        if (!Object.keys(state.list).includes(item._id)) {
          articles[item._id] = item;
        }

        return articles;
      }, {});

      return {
        isLoading: false,
        list: {
          ...state.list,
          ...userArticles
        }
      };
    case ActionTypes.HANDLE_LIKE:
      return {
        ...state,
        list: {
          ...state.list,
          [action.payload.article._id]: action.payload.article
        }
      };
    case ActionTypes.RECEIVE_POSTS_BY_KEYWORD:
      const searchArticles = action.payload.reduce((articles, item) => {
        if (!Object.keys(state.list).includes(item._id)) {
          articles[item._id] = item;
        }

        return articles;
      }, {});

      return {
        isLoading: false,
        list: {
          ...state.list,
          ...searchArticles
        }
      };
    default:
      return state;
  }
}
