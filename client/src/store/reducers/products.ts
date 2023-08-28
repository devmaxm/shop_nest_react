import {ProductsStateType} from "../../types/store/products-reducer-types";
import {LOAD_CURRENT_PRODUCT_SUCCESS} from "../actions/products";

const initialState: ProductsStateType = {
    currentProduct: null
}

const productsReducer = (state=initialState, action: any) => {
    switch (action.type) {
        case LOAD_CURRENT_PRODUCT_SUCCESS: {
            return {
                ...state, currentProduct: action.product
            }
        }
        default: return state
    }
}

export default productsReducer