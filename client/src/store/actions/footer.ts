import {ThunkType} from "../../types/store/store";
import axios from "axios";

export const LOAD_FOOTER_CATEGORIES: string = "LOAD_FOOTER_CATEGORIES"

export const loadFooterCategories = (): ThunkType => async dispatch => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/category`)
        dispatch({type: LOAD_FOOTER_CATEGORIES, categories: response.data.categories})
    } catch (e) {
        console.log(e)
    }
}