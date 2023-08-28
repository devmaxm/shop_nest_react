import {ProfileType} from "../profile-types";
import {Order} from "../cart-types";

export type ProfileStateType = {
    profile: ProfileType | null
    myOrders: Order[] | null
}