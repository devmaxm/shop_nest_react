import * as React from 'react';
import {Outlet} from "react-router-dom";
import {
    BrandType, CategoryType, ColorType,
    ModelWithRelationsType,
    ProductWithRelationsType, PropertyType,
    RequiredPropertyType
} from "../../../types/product-types";

export type PropsType = {
    products: ProductWithRelationsType[],
    models: ModelWithRelationsType[]
    requiredFields: RequiredPropertyType[] | null
    brand: BrandType | null
    category: CategoryType | null
    colors: ColorType[]
    setRequiredFields: (modelId: number) => void
    addProduct: (title: string, description: string,
                 priceUAN: string, sale: string, colorId: string, availableQuantity: string, mainPhoto: File, otherPhotos: FileList,
                 modelId: string, properties: PropertyType[], categoryId: string, brandId: string, slug: string, code: string) => void
    createReview: (productId: number, username:string, review: string, rating: number | null, createdAt: string) => void
    toggleModal: (modalType?: string, id?: number) => void
}

function AdminProduct(props: PropsType) {
    return (
        <Outlet context={{
            products: props.products,
            requiredFields: props.requiredFields,
            brand: props.brand,
            category: props.category,
            colors: props.colors,
            models: props.models,
            setRequiredFields: props.setRequiredFields,
            addProduct: props.addProduct,
            createReview: props.createReview,
            toggleModal: props.toggleModal
        }}/>
    )
}

export default AdminProduct