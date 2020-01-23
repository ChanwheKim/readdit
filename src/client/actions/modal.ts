import { DISPLAY_MODAL, REMOVE_MODAL } from "./types";

export const displayModal = message => ({
  type: DISPLAY_MODAL,
  payload: message,
});

export const removeModal = () => ({
  type: REMOVE_MODAL,
  payload: '',
});
