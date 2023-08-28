import {IsNumber, IsString} from "class-validator";

export class CreateRatingDto {
    @IsNumber()
    rating: number;

    @IsString()
    username: string

    @IsNumber()
    productId: number;
}

export class CreateReviewDto {
    @IsNumber()
    productId: number;

    @IsString()
    username: string

    @IsString()
    review: string

    @IsString()
    createdAt: string

    rating?: number

}