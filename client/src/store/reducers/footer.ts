import {FooterStateType} from "../../types/store/footer-reducer-types";
import {LOAD_FOOTER_CATEGORIES} from "../actions/footer";

let initialState: FooterStateType = {
    categories: []
}

const footerReducer = (state=initialState, action: any) => {
    switch (action.type) {
        case LOAD_FOOTER_CATEGORIES: {
            return {...state, categories: action.categories}
        }
        default: return state
    }
}

export default footerReducer