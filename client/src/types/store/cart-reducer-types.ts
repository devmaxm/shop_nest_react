import {ErrorType} from "./store";
import {CartType} from '../cart-types'


export type CartStateType = {
    cart: CartType,
    errors: ErrorType | null
}