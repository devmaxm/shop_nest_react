import {Body, Controller, Get, Post, UseGuards, Req, ValidationPipe} from '@nestjs/common';
import {OrdersService} from "./orders.service";
import {CreateOrderDto} from "./orders.dto";
import {JwtGuard} from "../auth/guards/jwt.guard";

@Controller('orders')
export class OrdersController {
    constructor(
        private ordersService: OrdersService
    ) {
    }

    @UseGuards(JwtGuard)
    @Get('my')
    async getMyOrders(@Req() req) {
        const userId = req.user.id
        return await this.ordersService.getMyOrders(userId)
    }

    @Post()
    async createOrder(@Body(new ValidationPipe()) body: CreateOrderDto) {
        return await this.ordersService.createOrder(body)
    }
}
