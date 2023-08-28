import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Rating, Review} from "./reviews.entity";
import {ReviewsController} from './reviews.controller';
import {ReviewsService} from './reviews.service';
import {UsersModule} from "../users/users.module";
import {ProductsModule} from "../products/products.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([
            Review,
            Rating
        ]),
        UsersModule,
        forwardRef(() => ProductsModule)
    ],
    controllers: [ReviewsController],
    providers: [ReviewsService],
    exports: [ReviewsService]
})
export class ReviewsModule {}
