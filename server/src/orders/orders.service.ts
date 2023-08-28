import { Injectable } from '@nestjs/common';
import {CreateOrderDto} from "./orders.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Order, OrderItem} from "./orders.entity";
import {Repository} from "typeorm";
import {User} from "../users/users.entity";
import {Product} from "../products/products.entity";

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,

        @InjectRepository(OrderItem)
        private orderItemRepository: Repository<OrderItem>,

        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {
    }

    async createOrder(order: CreateOrderDto) {
        const user = order.userId && await this.userRepository.findOneBy({id: order.userId})
        const createdOrder = await this.orderRepository.create({
            fullName: order.fullName,
            email: order.email,
            phoneNumber: order.phoneNumber,
            country: order.country,
            city: order.city,
            shippingAddress: order.shippingAddress,
            isPaid: false,
            totalPrice: order.totalPrice,
            totalDiscountPrice: order.totalDiscountPrice,
            comment: order.comment,
            user
        })
        console.log(order.comment)
        await this.orderRepository.save(createdOrder)

        order.items.map(async (item) => {
            const product = await this.productRepository.findOneBy({slug: item.slug})
            const createdItem = {
                product,
                order: createdOrder,
                price: item.price,
                discountPrice: item.discountPrice,
                quantity: item.quantity,
            }
            await this.orderItemRepository.save(createdItem)
        })
        return createdOrder
    }

    async getMyOrders(userId: number) {
        const query = await this.orderRepository.createQueryBuilder('orders')
            .leftJoinAndSelect('orders.products', 'products')
            .leftJoinAndSelect('products.product', 'product')
            .leftJoinAndSelect('orders.user', 'user')
            .where('orders.user.id = :userId', {userId})
            .getManyAndCount()
        const [orders, count] = query
        return {orders, count}
    }

    async getAllOrders() {
        const orders = await this.orderRepository.createQueryBuilder('orders')
            .leftJoinAndSelect('orders.products', 'products')
            .leftJoinAndSelect('products.product', 'product')
            .leftJoinAndSelect('orders.user', 'user')
            .getMany()
        return orders
    }
}
