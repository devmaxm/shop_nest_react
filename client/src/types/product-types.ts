//Products
import {addToCart} from "../store/actions/cart";
import {CartType} from "./cart-types";

export type CategoryType = {
    id: number;
    category: string;
    slug: string
}
export type BrandType = {
    id: number;
    brand: string;
    description: string;
    slug: string
}
export type ModelType = {
    id: number;
    model: string;
    slug: string;
}
export type RequiredPropertyType = {
    id: number;
    property: string
    slug: string
}
export type PropertyType = {
    property: string,
    propertyValue: string
    propertySlug: string
}
export type ColorType = {
    id: number;
    color: string;
    hex: string;
    slug: string;
}
export type ProductType = {
    id: number;
    title: string;
    slug: string;
    description: string;
    code: string
    priceUAN: number;
    priceUSD: number | null;
    sale: number
    availableQuantity: number;
    isAvailable: boolean
    createdAt: Date;
    photo: string;
}

export interface ProductWithRelationsType extends ProductType {
    category: CategoryType;
    brand: BrandType;
    color: ColorType;
    model: ModelType;
    properties: PropertyType[];
}

//Other
export interface ModelWithRelationsType extends ModelType {
    brand: BrandType,
    category: CategoryType
}

export interface CategoryWithModelsType extends CategoryType {
    models: ModelType[]
}

export type ReviewType = {
    id: number;
    review: string;
    isModerated: boolean;
    createdAt: string;
    username: string
    rating: number
}
export type PhotoType = {
    id: number;
    photoUrl: string
}

export interface ProductTypeWithReviews extends ProductWithRelationsType {
    photos: PhotoType[]
    reviews: ReviewType[];
    averageRating: number;
    ratingCount: number;
}

//Props type
export type PropsType = {
    currentProduct: ProductTypeWithReviews | null
    addToCart: (productId: number, quantity: number) => void
    cart: CartType
}

export interface ContainerPropsType extends PropsType {
    loadProduct: (slug: string) => void,

}

export type PhotoCarouselPropsType = {
    photos: PhotoType[]
}

export interface ProductFooterProps extends ProductDescriptionProps, ProductPropertiesPropsType {
    reviews: ReviewType[]
}

export type ProductDescriptionProps = {
    description: string | null
}
export type ProductPropertiesPropsType = {
    properties: PropertyType[]
}

export type ProductReviewsType = {
    reviews: ReviewType[]
    averageRating: number
    addReview: (productId: number, review: string) => void
}

