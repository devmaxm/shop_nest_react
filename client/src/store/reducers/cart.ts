import {CartStateType} from "../../types/store/cart-reducer-types";
import {DELETE_ITEM_SUCCESS, SET_CART_SUCCESS} from "../actions/cart";

let initialState: CartStateType = {
    cart: {
        items: [],
        totalPrice: 0,
        totalDiscountPrice: 0
    },
    errors: null
}

const cartReducer = (state = initialState, action: any): CartStateType => {
    switch (action.type) {
        case SET_CART_SUCCESS: {
            sessionStorage.setItem('cart', JSON.stringify(action.cart))
            return {
                ...state, cart: action.cart
            }
        }
        case DELETE_ITEM_SUCCESS: {
            const stateCopy = {
                ...state, cart: {...state.cart, items: [...state.cart.items], totalPrice: action.totalPrice}
            }
            stateCopy.cart.items = stateCopy.cart.items.filter(item => item.id !== action.id)
            return stateCopy
        }
        default: return state
    }
}

export default cartReducer