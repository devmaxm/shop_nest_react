import {BrandType, CategoryType, ModelWithRelationsType} from "../product-types";

export type PropsType = {
    models: ModelWithRelationsType[]
    brands: BrandType[]
    categories: CategoryType[]
    addModel: (model: string, brandId: number, categoryId: number, slug:string) => {}
}

export interface ContainerPropsType extends PropsType {
    loadModels: () => void
    loadBrands: () => void
    loadCategories: () => void
}