import {UserType} from "./auth-types";
import {ProductType} from "./product-types";

export type CartItemType = {
    id: number
    slug: string
    title: string;
    code: string;
    photo: string;
    quantity: number;

    price: number;
    sale: number;
    discountPrice: number
}

export type CartType = {
    items: CartItemType[] | []
    totalPrice: number
    totalDiscountPrice: number
}

//order
export type OrderItem = {
    id: number
    discountPrice: number,
    price: number
    quantity: number
    product: ProductType
}
export type Order = {
    id: number
    fullName: string
    email: string
    phoneNumber: string
    country: string
    city: string
    shippingAddress: string
    comment: string | null
    totalPrice: number
    totalDiscountPrice: number
    isPaid: boolean
    createdAt: Date
    products: OrderItem[],
    user: UserType
}
