import {
  RECEIVE_POSTS_BY_KEYWORD,
} from '../actions/types';

export default function searchReducer(state = [], action) {
  switch (action.type) {
    case RECEIVE_POSTS_BY_KEYWORD:
      const articleIds = action.payload.map(article => article._id);

      return [
        ...articleIds,
      ];
    default:
      return state;
  }
}
