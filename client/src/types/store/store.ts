import {AuthStateType} from "./auth-reducer-types";
import {AdminStateType} from "./admin-reducer-types";
import {HeaderStateType} from "./header-reducer-types";
import {CatalogStateType} from "./catalog-reducer-types";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import {ProductsStateType} from "./products-reducer-types";
import {CartStateType} from "./cart-reducer-types";
import {FooterStateType} from "./footer-reducer-types";
import {ProfileStateType} from "./profile-reducer-types";

export type ThunkType = ThunkAction<Promise<void>, {}, {}, AnyAction>

export type StoreType = {
    auth: AuthStateType,
    admin: AdminStateType,
    header: HeaderStateType,
    catalog: CatalogStateType
    products: ProductsStateType,
    cart: CartStateType,
    footer: FooterStateType,
    profile: ProfileStateType,
}

export type ErrorType = {
    message: string,
    statusCode: number
}