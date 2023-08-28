import {
    LOGIN_SUCCESS, LOGOUT, ERROR, TOGGLE_MODAL_OPEN
} from "../actions/auth";
import {AuthStateType} from "../../types/store/auth-reducer-types";


let initialState: AuthStateType = {
    token: localStorage.getItem('token'),
    isAuth: localStorage.getItem('token') ? true : false,
    user: JSON.parse(localStorage.getItem('user') || "{}"),
    isOpenModal: false,
    error: null
}

function authReducer(state = initialState, action: any): AuthStateType {
    switch (action.type) {
        case (LOGIN_SUCCESS): {
            localStorage.setItem('token', action.token)
            localStorage.setItem('user', JSON.stringify(action.user))
            return {
                ...state,
                isAuth: true,
                user: action.user,
                token: action.token,
                error: null
            }
        }
        case (ERROR): {
            debugger
            return {...state, error: action.error}
        }
        case (LOGOUT): {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            return {
                ...state,
                token: "",
                user: null,
                isAuth: false
            }
        }
        case (TOGGLE_MODAL_OPEN): {
            return {...state, isOpenModal: state.isOpenModal ? false : true}
        }
        default:
            return state
    }
}

export default authReducer