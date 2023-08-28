import {ErrorType} from "./store";
import {UserType} from "../auth-types";

export type AuthStateType = {
    token: string | null,
    isAuth: true | false,
    user: UserType | null,
    error: ErrorType | null
    isOpenModal: boolean
}