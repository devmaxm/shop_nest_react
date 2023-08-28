import {ThunkType} from "../../types/store/store";
import axios from "axios";

export const LOAD_CURRENT_PRODUCT_SUCCESS: string = "LOAD_CURRENT_PRODUCT_SUCCESS"

export const loadProduct = (slug: string): ThunkType => async dispatch => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/${slug}`)
        dispatch({type: LOAD_CURRENT_PRODUCT_SUCCESS, product: response.data})
    } catch (e) {
        console.log(e)
    }
}
