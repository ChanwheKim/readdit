import {
  IS_POSTING,
  RECEIVE_NEW_ARTICLE,
  REMOVE_MODAL,
  RESET_NEW_ARTICLE,
} from '../actions/types';

const initialState = {
  isPosting: false,
  article: {},
};

export default function newArticleReducer(state = initialState, action) {
  switch (action.type) {
    case IS_POSTING:
      return {
        article: {},
        isPosting: true,
      };
    case RECEIVE_NEW_ARTICLE:
      return {
        isPosting: false,
        article: action.payload,
      };
    case REMOVE_MODAL:
      return {
        ...state,
        isPosting: false,
      };
    case RESET_NEW_ARTICLE:
      return {
        isPosting: false,
        article: action.payload,
      };
    default:
      return state;
  }
}
