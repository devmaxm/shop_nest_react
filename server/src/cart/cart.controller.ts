import {Body, Controller, Delete, Get, Param, Post, Put, Req, Session, Res, Request} from '@nestjs/common';
import {AddToCartDto} from "./cart.dto";
import {ProductsService} from "../products/products.service";

@Controller('cart')
export class CartController {
    constructor(
        private readonly productsService: ProductsService
    ) {
    }

    @Post()
    async addToCart(@Body() body: AddToCartDto, @Session() session: Record<string, any>, @Req() req) {
        const {productId, quantity} = body
        const cart = session.cart || {items: [], totalPrice: 0, totalDiscountPrice: 0}
        const existingItem = cart.items.find((item) => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            const product = await this.productsService.findOne(productId)
            const discountPrice: number = product.sale > 0 ? Math.ceil(product.priceUAN - (product.priceUAN / 100 * product.sale)) : product.priceUAN
            const newItem = {
                id: productId,
                title: product.title,
                code: product.code,
                photo: product.photo,
                slug: product.slug,
                quantity,
                price: product.priceUAN,
                sale: product.sale,
                discountPrice
            };
            cart.items.push(newItem);
        }

        cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
        cart.totalDiscountPrice = cart.items.reduce((total, item) => total + item.discountPrice * item.quantity, 0);
        session.cart = cart

        return {cart}
    }

    @Get()
    async getCart(@Session() session: Record<string, any>) {
        const cart = session.cart || {items: [], totalPrice: 0, totalDiscountPrice: 0}
        return {cart}
    }

    @Put(':productId')
    async decrementCartItem(@Param('productId') productId: string, @Session() session: Record<string, any>) {
        const cart = session.cart || {items: [], totalPrice: 0, totalDiscountPrice: 0}
        const existingItem = cart.items.find((item) => item.id === parseInt(productId));
        if (existingItem && existingItem.quantity === 1) {
            cart.items = cart.items.filter((item) => item.id !== parseInt(productId))
        } else if (existingItem && existingItem.quantity > 1) {
            existingItem.quantity -= 1;
        }

        cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
        cart.totalDiscountPrice = cart.items.reduce((total, item) => total + item.discountPrice * item.quantity, 0);
        session.cart = cart
        return {cart}
    }

    @Delete(':id')
    async deleteItem(@Session() session: Record<string, any>, @Param('id') id: string) {
        const cart = session.cart || {items: [], totalPrice: 0}
        const existingItem = cart.items.find((item) => item.id === parseInt(id));
        if (existingItem) {
            cart.items = cart.items.filter((item) => item.id !== parseInt(id))
        }
        cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
        cart.totalDiscountPrice = cart.items.reduce((total, item) => total + item.discountPrice * item.quantity, 0);
        session.cart = cart
        return {cart}
    }
}
