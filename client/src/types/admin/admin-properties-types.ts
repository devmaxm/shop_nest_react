import {RequiredPropertyType} from "../product-types";

export type PropsType = {
    addProperty: (property: string, slug: string) => void
    properties: RequiredPropertyType[]
    toggleModal: (modalType?: string, id?: number) => void
}

export interface ContainerPropsType extends PropsType {
    loadProperties: () => void
}