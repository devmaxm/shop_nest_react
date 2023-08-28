import {AnyAction} from "redux";
import {ThunkAction} from "redux-thunk";
import axios, {AxiosError} from "axios";

export const LOGIN_SUCCESS: string = "LOGIN_SUCCESS"
export const LOGOUT: string = "LOGOUT"

export const ERROR: string = "ERROR"

export const TOGGLE_MODAL_OPEN: string = "TOGGLE_MODAL_OPEN"

const errorHandle = (e: any) => {
    const errors = e as Error | AxiosError;
    if(axios.isAxiosError(errors)){
        if (errors.response) {
            return errors.response.data
        }
    }
}
export const login = (email: string, password: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch) => {
    try {
        const data = {email, password}
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, data, config)
        dispatch({type: LOGIN_SUCCESS, token: response.data.token, user: response.data.user})
    } catch (e) {
        dispatch({type: ERROR, error: errorHandle(e)})
        dispatch({type: LOGOUT})
    }
}
export const logout = () => {
    return {type: LOGOUT}
}
export const checkAuth = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/check`, config)
        dispatch({type: LOGIN_SUCCESS, token: response.data.token, user: response.data.user})
    } catch {
        dispatch({type: LOGOUT})
    }
}
export const register = (email: string, fullName: string, password: string, password2: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch) => {
    try {
        const data = {email, fullName, password, password2}
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, data)
        dispatch({type: LOGIN_SUCCESS, token: response.data.token, user: response.data.user})
    } catch (e) {
        dispatch({type: ERROR, error: errorHandle(e)})
        dispatch({type: LOGOUT})
    }
}

export const toggleModal = () => {
    return {type: TOGGLE_MODAL_OPEN}
}