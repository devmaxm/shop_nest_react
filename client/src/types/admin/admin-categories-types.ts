import {CategoryType, RequiredPropertyType} from "../product-types";

export type PropsType = {
    categories: CategoryType[] | [],
    requiredProperties: RequiredPropertyType[]
    addCategory: (category: string, slug: string, requiredProperties: number[]) => void
    toggleModal: (modalType?: string, id?: number) => void
}

export interface ContainerPropsType extends PropsType {
    loadCategories: () => void,
    loadProperties: () => void
}