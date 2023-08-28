import {ErrorType} from "./store";
import {CatalogType} from "../catalog-types";

export type CatalogStateType = {
    catalog: CatalogType,
    error: ErrorType | null,
    isLoading: boolean
}