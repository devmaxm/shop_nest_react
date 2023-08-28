import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import axios from "axios";

export const LOAD_CATEGORIES: string = "LOAD_CATEGORIES"
export const TOGGLE_SEARCH: string = "TOGGLE_SEARCH"

export const toggleSearch = () => {
    return {type: TOGGLE_SEARCH}
}

export const loadCategories = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => async dispatch => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/category`)
        dispatch({type: LOAD_CATEGORIES, categories: response.data.categories})
    } catch (e) {
        console.log(e)
    }
}