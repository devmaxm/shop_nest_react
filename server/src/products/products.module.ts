import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductsService} from './products.service';
import {JwtService} from "@nestjs/jwt";
import {ProductsController} from './products.controller';
import {
    Brand,
    Category,
    Model,
    Product,
    ProductColor,
    ProductPhoto,
    Property,
    RequiredProperty
} from "./products.entity";
import {Rating, Review} from "../reviews/reviews.entity";
import {User} from "../users/users.entity";
import {ReviewsModule} from "../reviews/reviews.module";
import {ReviewsService} from "../reviews/reviews.service";
import {UsersModule} from "../users/users.module";
import {UsersService} from "../users/users.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Product,
            Brand,
            Category,
            Property,
            ProductPhoto,
            ProductColor,
            Model,
            RequiredProperty,
            Review,
            Rating,
        ]),
        forwardRef(() => ReviewsModule)
    ],
    providers: [ProductsService, JwtService],
    controllers: [ProductsController],
    exports: [ProductsService]
})
export class ProductsModule {
}
