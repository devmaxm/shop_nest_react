import {CartItemDto} from "../cart/cart.dto";
import {IsNumber, IsString} from "class-validator";

export class CreateOrderDto {
    userId: number | null
    items: CartItemDto[]

    @IsString()
    fullName: string

    @IsString()
    email: string

    @IsString()
    phoneNumber: string

    @IsString()
    country: string

    @IsString()
    city: string

    @IsString()
    shippingAddress: string

    comment?: string

    @IsNumber()
    totalPrice: number

    @IsNumber()
    totalDiscountPrice: number
}