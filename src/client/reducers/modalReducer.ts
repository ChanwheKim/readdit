import { ActionTypes } from '../actions/types';

const initialState = {
  showModal: false,
  message: '',
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.DISPLAY_MODAL:
      return {
        showModal: true,
        message: action.payload,
      };
    case ActionTypes.REMOVE_MODAL:
      return {
        showModal: false,
        message: action.payload,
      };
    default:
      return state;
  }
}
