import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import {DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DATABASE, JWT_SECRET_KEY} from "../config";

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CatalogModule } from './catalog/catalog.module';

import {
    Brand,
    Category,
    Model,
    Product,
    ProductColor,
    ProductPhoto,
    Property,
    RequiredProperty
} from "./products/products.entity";
import {User} from "./users/users.entity";
import {Rating, Review} from "./reviews/reviews.entity";
import {Order, OrderItem} from "./orders/orders.entity";
import {JwtModule} from "@nestjs/jwt";
import {RolesModule} from "./roles/roles.module";
import { AdminModule } from './admin/admin.module';
import { CartService } from './cart/cart.service';
import { CartController } from './cart/cart.controller';
import { CartModule } from './cart/cart.module';
import { QuestionModule } from './question/question.module';
import {Question} from "./question/question.entity";


@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: DB_HOST,
            port: DB_PORT,
            username: DB_USERNAME,
            password: DB_PASSWORD,
            database: DATABASE,
            entities: [
                User,
                Brand, Category, Product, ProductPhoto, Property, ProductColor, Model, RequiredProperty,
                Rating, Review,
                Order, OrderItem,
                Question
            ],
            synchronize: true,
            migrations: [],
            migrationsTableName: "migrations",

        }),
        JwtModule.register({
            secret: JWT_SECRET_KEY,
            signOptions: {expiresIn: "60m"}
        }),
        AuthModule,
        UsersModule,
        OrdersModule,
        ProductsModule,
        ReviewsModule,
        CatalogModule,
        RolesModule,
        AdminModule,
        CartModule,
        QuestionModule
    ],
    controllers: [CartController],
    providers: [CartService],
})
export class AppModule {
}
