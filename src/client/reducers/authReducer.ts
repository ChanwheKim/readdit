import { ActionTypes } from '../actions/types';

export default function authReducer(state = null, action) {
  switch (action.type) {
    case ActionTypes.FETCH_USER:
      return action.payload || false;
    case ActionTypes.HANDLE_LIKE:
      return {
        ...state,
        like: action.payload.like,
      };
    default:
      return state;
  }
}
