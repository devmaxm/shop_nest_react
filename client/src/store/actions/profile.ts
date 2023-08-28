import {ThunkType} from "../../types/store/store";
import axios from "axios";

export const LOAD_PROFILE_SUCCESS: string = "LOAD_PROFILE_SUCCESS"

export const ADD_TO_FAVORITE_SUCCESS: string = "ADD_TO_FAVORITE_SUCCESS"
export const REMOVE_FROM_FAVORITE_SUCCESS: string = "REMOVE_FROM_FAVORITE_SUCCESS"

export const LOAD_MY_ORDERS_SUCCESS: string = "LOAD_MY_ORDERS_SUCCESS"

export const loadProfile = (): ThunkType => async dispatch => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/me`, config)
        dispatch({type: LOAD_PROFILE_SUCCESS, profile: response.data.profile})
    } catch (e) {
        console.log(e)
    }
}
export const addToFavorite = (productId: number): ThunkType => async dispatch => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        const data = {productId}
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/favorite`, data, config)
        dispatch({type: ADD_TO_FAVORITE_SUCCESS, product: response.data.product})
    } catch (e) {
        console.log(e)
    }
}
export const removeFromFavorite = (productId: number): ThunkType => async dispatch => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        await axios.delete(`${process.env.REACT_APP_API_URL}/users/favorite/${productId}`, config)
        dispatch({type: REMOVE_FROM_FAVORITE_SUCCESS, productId})
    } catch (e) {
        console.log(e)
    }
}
export const loadOrders = ():ThunkType => async dispatch => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders/my`, config)
        dispatch({type: LOAD_MY_ORDERS_SUCCESS, orders: response.data.orders})
    } catch (e) {
        console.log(e)
    }
}