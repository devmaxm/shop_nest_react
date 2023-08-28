import {IsEmail, IsNotEmpty, IsNumber} from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    fullName: string

    @IsNotEmpty()
    password: string
}

export class AddToFavoriteDto {
    @IsNumber()
    productId: number
}