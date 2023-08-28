import {Module} from '@nestjs/common';
import {AdminController} from './admin.controller';
import {JwtService} from "@nestjs/jwt";
import {ProductsService} from "../products/products.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {
    Brand,
    Category,
    Model,
    Product,
    ProductColor,
    ProductPhoto,
    Property,
    RequiredProperty
} from "../products/products.entity";
import {User} from "../users/users.entity";
import {AdminService} from "./admin.service";
import {ReviewsService} from "../reviews/reviews.service";
import {Rating, Review} from "../reviews/reviews.entity";
import {UsersService} from "../users/users.service";
import {QuestionService} from "../question/question.service";
import {Question} from "../question/question.entity";
import {OrdersService} from "../orders/orders.service";
import {Order, OrderItem} from "../orders/orders.entity";

@Module({
    imports: [TypeOrmModule.forFeature([
        Product,
        Category,
        Property,
        Brand,
        Model,
        ProductColor,
        ProductPhoto,
        RequiredProperty,
        User,
        Rating,
        Review,
        Question,
        Order,
        OrderItem
    ])],
    providers: [AdminService, JwtService, ProductsService, ReviewsService, UsersService, QuestionService, OrdersService],
    controllers: [AdminController]
})
export class AdminModule {
}
