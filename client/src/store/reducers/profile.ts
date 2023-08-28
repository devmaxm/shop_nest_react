import {ProfileStateType} from "../../types/store/profile-reducer-types";
import {
    ADD_TO_FAVORITE_SUCCESS,
    LOAD_PROFILE_SUCCESS,
    REMOVE_FROM_FAVORITE_SUCCESS,
    LOAD_MY_ORDERS_SUCCESS
} from "../actions/profile";

let initialState: ProfileStateType = {
    profile: null,
    myOrders: null
}

const profileReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case (LOAD_PROFILE_SUCCESS): {
            return {
                ...state, profile: action.profile
            }
        }
        case (ADD_TO_FAVORITE_SUCCESS): {
            return state.profile && {
                ...state, profile: {...state.profile, favorite: [...state.profile.favorite, action.product]}
            }
        }
        case (REMOVE_FROM_FAVORITE_SUCCESS): {
            const stateCopy = state.profile && {
                ...state, profile: {...state.profile, favorite: [...state.profile.favorite]}
            }
            if (stateCopy) {
                stateCopy.profile.favorite = stateCopy.profile.favorite.filter((i) => i.id !== action.productId)
            }

            return stateCopy
        }
        case LOAD_MY_ORDERS_SUCCESS: {
            return {...state, myOrders: action.orders}
        }
        default:
            return state
    }
}

export default profileReducer