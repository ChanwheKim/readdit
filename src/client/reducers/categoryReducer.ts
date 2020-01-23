import { ActionTypes } from '../actions/types';

export default function categoryReducer(state = [], action) {
  switch (action.type) {
    case ActionTypes.FETCH_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
}
