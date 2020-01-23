import axios from "axios";
import { Dispatch } from "redux";
import { FETCH_CATEGORIES } from "./types";

export interface Categories {
  articleIds: string[],
  _id: string,
  name: string,
  count: number,
}

export const fetchCategories = () => async (dispatch: Dispatch) => {
  const res = await axios.get<Categories>('/api/categories');
  dispatch({ type: FETCH_CATEGORIES, payload: res.data });
};
