import {UserType} from "./auth-types";
import {ProductWithRelationsType} from "./product-types";

export interface ProfileType extends UserType{
    favorite: ProductWithRelationsType[]
}