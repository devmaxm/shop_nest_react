import {Body, Controller, Delete, Post, Put, Req, UseGuards, ValidationPipe} from '@nestjs/common';
import {ReviewsService} from "./reviews.service";
import {JwtGuard} from '../auth/guards/jwt.guard'
import {CreateRatingDto, CreateReviewDto} from "./reviews.dto";

@Controller('reviews')
export class ReviewsController {
    constructor(private reviewsService: ReviewsService) {
    }

    // @UseGuards(JwtGuard)
    // @Post()
    // async addReview(
    //     @Req() req,
    //     @Body(new ValidationPipe()) body: CreateReviewDto
    // ) {
    //     const userId = req.user.id
    //     return await this.reviewsService.createReview(body.productId, body.review, userId)
    // }
    //
    // @UseGuards(JwtGuard)
    // @Post('add_rating')
    // async setRating(
    //     @Req() req,
    //     @Body(new ValidationPipe()) body: CreateRatingDto
    // ) {
    //     const userId = req.user.id
    //     return await this.reviewsService.setRating(body.rating, body.productId, userId)
    // }

    @Put(':id')
    async update() {

    }

    @Delete(':id')
    async delete() {

    }
}
