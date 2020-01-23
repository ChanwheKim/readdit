import { ActionTypes } from "../actions/types";

const initialState = {
  isPosting: false,
  article: {}
};

export default function newArticleReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.IS_POSTING:
      return {
        article: {},
        isPosting: true
      };
    case ActionTypes.GET_NEW_ARTICLE:
      return {
        isPosting: false,
        article: action.payload
      };
    case ActionTypes.REMOVE_MODAL:
      return {
        ...state,
        isPosting: false
      };
    case ActionTypes.RESET_NEW_ARTICLE:
      return {
        isPosting: false,
        article: action.payload
      };
    default:
      return state;
  }
}
