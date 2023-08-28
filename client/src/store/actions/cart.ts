import {ThunkType} from "../../types/store/store";
import axios from "axios";
import {CartItemType} from "../../types/cart-types";

export const SET_CART_SUCCESS: string = "SET_CART_SUCCESS"
export const DELETE_ITEM_SUCCESS: string = "DELETE_ITEM_SUCCESS"
export const ADD_ITEM_SUCCESS: string = "ADD_ITEM_SUCCESS"


export const loadCart = (): ThunkType => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
            withCredentials: true
        }
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/cart/`, config)
        dispatch({type: SET_CART_SUCCESS, cart: response.data.cart})
    } catch (e) {
        console.log(e)
    }
}
export const addToCart = (productId: number, quantity: number): ThunkType => async dispatch => {
    try {
        const data = {productId, quantity}
        const config = {
            headers: {
                "Content-type": "application/json",
            },
            withCredentials: true
        }
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/cart`, data, config)
        dispatch({type: SET_CART_SUCCESS, cart: response.data.cart})
    } catch (e) {
        console.log(e)
    }
}
export const deleteItem = (productId: number): ThunkType => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
            withCredentials: true
        }
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/cart/${productId}`, config)
        dispatch({type: DELETE_ITEM_SUCCESS, id: productId, totalPrice: response.data.cart.totalPrice})
    } catch (e) {
        console.log(e)
    }
}
export const decrementItem = (productId: number): ThunkType => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
            withCredentials: true
        }
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/cart/${productId}`, {}, config)

        dispatch({type: SET_CART_SUCCESS, cart: response.data.cart})
    } catch (e) {
        console.log(e)
    }
}
export const createOrder = (
    fullName: string, email: string, phoneNumber: string, country: string, city: string, shippingAddress: string, comment: string,
    userId: number | null, totalPrice: number, totalDiscountPrice: number, items: CartItemType[]
): ThunkType => async dispatch => {
    try {
        const data = {
            fullName, email, phoneNumber, city, country, shippingAddress, userId, totalPrice, totalDiscountPrice, items, comment
        }
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/orders`, data)
    } catch (e) {
        console.log(e)
    }
}