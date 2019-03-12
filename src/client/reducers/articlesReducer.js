import {
  FETCH_ARTICLES_BY_CATEGORY,
  RESET_ARTICLES_STATE,
  LOADING_ARTICLES,
  HANDLE_LIKE,
} from '../actions/types';

const initialState = {
  isLoading: false,
  list: [],
};

export default function articlesReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_ARTICLES:
      return {
        ...state,
        isLoading: action.payload,
      };
    case FETCH_ARTICLES_BY_CATEGORY:
      return {
        isLoading: false,
        list: action.payload,
      };
    case RESET_ARTICLES_STATE:
      return action.payload;
    case HANDLE_LIKE:
      const articles = state.articles.map(article =>
        article._id === action.payload.article._id
          ? action.payload.article
          : article);

      return {
        ...state,
        articles,
      };
    default:
      return state;
  }
}
