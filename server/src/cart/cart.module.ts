import { Module } from '@nestjs/common';
import {CartService} from "./cart.service";
import {CartController} from "./cart.controller";
import {ProductsModule} from "../products/products.module";

@Module({
    imports: [ProductsModule],
    providers: [CartService],
    controllers: [CartController],

})
export class CartModule {}
