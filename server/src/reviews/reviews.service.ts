import {forwardRef, HttpException, Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Rating, Review} from "./reviews.entity";
import {Repository} from "typeorm";
import {UsersService} from "../users/users.service";
import {ProductsService} from "../products/products.service";
import {raw} from "express";

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review)
        public reviewRepository: Repository<Review>,
        @InjectRepository(Rating)
        public ratingRepository: Repository<Rating>,
        private usersService: UsersService,
        @Inject(forwardRef(() => ProductsService))
        private productsService: ProductsService
    ) {
    }

    async createReview(productId: number, review: string, username: string, createdAt: string) {
        const product = await this.productsService.getOne(productId)
        const createdReview = await this.reviewRepository.create({review, username, product, createdAt})
        await this.reviewRepository.save(createdReview)
        return createdReview
    }

    async getOne(query: object) {
        return await this.reviewRepository.findOneBy(query)
    }

    async setRating(rating: number, productId: number, username: string) {
        const isRatingExist = await this.checkIfRatingExist(productId, username)
        if (isRatingExist) {
            const {...r} = isRatingExist
            if (r.rating !== rating) {
                const updatedRating = await this.updateRating(r.id, rating)
                return updatedRating
            }
            throw new HttpException('Rating exist', 500)
        }
        const product = await this.productsService.getOne(productId)
        const createdRating = this.ratingRepository.create({product, username, rating})
        await this.ratingRepository.save(createdRating)
        return createdRating
    }

    async updateRating(ratingId: number, rating: number) {
        const newRating = await this.ratingRepository.findOneBy({id: ratingId})
        newRating.rating = rating
        await this.ratingRepository.save(newRating)
        return newRating

    }

    async findRating(productId: number, username: string) {
        const rating = await this.ratingRepository.findOne({
            where: {
                username: username,
                product: {id: productId},
            }
        })
        return rating
    }

    async checkIfRatingExist(productId: number, username): Promise<any> {
        const rating = await this.findRating(productId, username)
        return rating
    }

    async getAverageRating(productId) {
        const queryBuilder = await this.ratingRepository.createQueryBuilder('rating')
            .select('AVG(rating.rating)', "avgRating")
            .leftJoin('rating.product', 'product')
            .where('product.id = :productId', {productId})
            .getRawOne();
        const averageRating = parseFloat(queryBuilder.avgRating).toFixed(2)
        // const response = averageRating !== "NaN" ? averageRating : 0
        return averageRating !== "NaN" ? averageRating : 0
    }

    async getReviewsByProductId(productId: number) {
        const reviews = await this.reviewRepository.createQueryBuilder('review')
            .leftJoinAndSelect('review.product', 'product')
            .where('review.product.id = :productId', {productId})
            // .where('review.isModerated = :isModerated', {isModerated: true})
            .select([
                'review.id',
                'review.review',
                'review.createdAt',
                'review.isModerated',
                'review.username',
                'product.id',
            ])
            .getMany()
        const response = await Promise.all(reviews.map(async (review) => {
            const result = {...review}
            const rating = await this.findRating(review.product.id, review.username)
            result["rating"] = rating ? rating.rating : null
            delete result["product"]
            return result
        }))
        return response
    }
}
