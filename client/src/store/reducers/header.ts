import {HeaderStateType} from "../../types/store/header-reducer-types";
import {LOAD_CATEGORIES, TOGGLE_SEARCH} from "../actions/header";

let initialState: HeaderStateType = {
    categories: [],
    isSearchActive: false
}

const headerReducer = (state = initialState, action:any): HeaderStateType => {
    switch (action.type) {
        case LOAD_CATEGORIES: {
            return {...state, categories: action.categories}
        }
        case TOGGLE_SEARCH: {
            return {
                ...state, isSearchActive: state.isSearchActive ? false : true
            }
        }
        default: return state
    }
}

export default headerReducer