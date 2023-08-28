import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import axios from "axios";
import {ThunkType} from "../../types/store/store";

export const LOAD_PRODUCTS_SUCCESS: string = "LOAD_PRODUCTS_SUCCESS"
export const LOAD_PRODUCTS_FAIL: string = "LOAD_PRODUCTS_FAIL"

export const TOGGLE_IS_LOADING: string = "TOGGLE_IS_LOADING"

export const toggleIsLoading = (isLoading: boolean) => {
    return {type: TOGGLE_IS_LOADING, isLoading}
}

export const loadProductByCategory = (category: string, query: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => async dispatch => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/catalog/${category}?${query}`)
        dispatch({type: LOAD_PRODUCTS_SUCCESS, catalog: response.data})

    } catch (e) {
        dispatch({type: LOAD_PRODUCTS_FAIL})
    }
}

export const loadProducts = (query: string): ThunkType => async dispatch => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/catalog/?${query}`)
        dispatch({type: LOAD_PRODUCTS_SUCCESS, catalog: response.data})

    } catch (e) {
        dispatch({type: LOAD_PRODUCTS_FAIL})
    }
}
