import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Order, OrderItem} from "./orders.entity";
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import {User} from "../users/users.entity";
import {Product} from "../products/products.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Order, OrderItem, User, Product])],
    providers: [OrdersService],
    controllers: [OrdersController]
})
export class OrdersModule {}
