import {CategoryWithModelsType} from "../product-types";

export type HeaderStateType = {
    categories: CategoryWithModelsType[] | []
    isSearchActive: boolean
}