import { FETCH_USER, HANDLE_LIKE } from '../actions/types';

export default function authReducer(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    case HANDLE_LIKE:
      return {
        ...state,
        like: action.payload.like,
      };
    default:
      return state;
  }
}
