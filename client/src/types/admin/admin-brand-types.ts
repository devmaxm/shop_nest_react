import {BrandType} from "../product-types";

export type PropsType = {
    brands: BrandType[],
    addBrand: (brand: string, description: string, slug: string) => void
    toggleModal: (modalType?: string, id?: number) => void
}

export interface ContainerPropsType extends PropsType {
    loadBrands: () => void
}