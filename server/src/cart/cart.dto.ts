export type CartItemDto = {
    title: string
    code: string
    photo: string
    slug: string
    quantity: number
    price: number
    sale: number
    discountPrice: number
}

export type AddToCartDto = {
    productId: number
    quantity: number
}