import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";

export interface Category {
  articleIds: string[];
  _id: string;
  name: string;
  count: number;
}

interface FetchCategoriesAction {
  type: ActionTypes.FETCH_CATEGORIES;
  payload: Category[];
}

export const fetchCategories = () => async (dispatch: Dispatch) => {
  const res = await axios.get<Category[]>("/api/categories");
  dispatch<FetchCategoriesAction>({
    type: ActionTypes.FETCH_CATEGORIES,
    payload: res.data
  });
};
