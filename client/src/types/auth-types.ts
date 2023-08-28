import {ErrorType} from "./store/store";

export type UserType = {
    id: number;
    email: string;
    fullName: string;
    role: string;
    isConfirmed: boolean
}

export type DefaultPropsType = {
    error: ErrorType | null
}

export interface LoginPropsType extends DefaultPropsType {
    login: (email: string, password: string) => void
}

export interface RegisterPropsType extends DefaultPropsType {
    register: (email: string, fullName: string, password: string, password2: string) => void
}