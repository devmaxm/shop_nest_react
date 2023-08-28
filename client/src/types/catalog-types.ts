import {CategoryType, ColorType, ModelType, ProductWithRelationsType} from "./product-types";
import {CartType} from "./cart-types";
import {addToFavorite, removeFromFavorite} from "../store/actions/profile";
import {ProfileType} from "./profile-types";


type AvailablePropType = {
    name: string,
    slug: string,
    values: string[]
}

export type FilterValuesType = {
    availableColors: ColorType[],
    availableProperties: AvailablePropType[],
    availableModels: ModelType[]
    availableCategories: CategoryType[]
}
export type CatalogType = {
    products: ProductWithRelationsType[] | [],
    productCount: number,
    currentPage: number,
    pageSize: number,
    category: CategoryType | {
        id: 0,
        category: 'Catalog',
        slug: 'catalog-default-slug'
    }
    filterValues: FilterValuesType | null
}


//Props