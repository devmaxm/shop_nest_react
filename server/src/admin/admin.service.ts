import {Injectable} from "@nestjs/common";

import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "../users/users.entity";
import {RolesEnum} from "../roles/roles.enum";
import {Review} from "../reviews/reviews.entity";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Review)
        private reviewRepository: Repository<Review>
    ) {}

    async giveUserAdminRole(userId: number) {
        const user = await this.userRepository.findOneBy({id:userId})
        user.role = RolesEnum.Admin
        await this.userRepository.save(user)
        return user
    }

    async moderateReview(id: number) {
        const review = await this.reviewRepository.findOneBy({id})
        review.isModerated = true
        await this.reviewRepository.save(review)
        return review
    }
}