import { ActionTypes } from "./types";

export interface DisplayModalAction {
  type: ActionTypes.DISPLAY_MODAL;
  payload: string;
}

interface RemoveModalAction {
  type: ActionTypes.REMOVE_MODAL;
  payload: "";
}

export const displayModal = (message: string): DisplayModalAction => ({
  type: ActionTypes.DISPLAY_MODAL,
  payload: message
});

export const removeModal = (): RemoveModalAction => ({
  type: ActionTypes.REMOVE_MODAL,
  payload: ""
});
