import {Body, Controller, Delete, Get, Param, Post, Request, UseGuards, ValidationPipe} from '@nestjs/common';


import {UsersService} from "./users.service";
import {AddToFavoriteDto} from "./users.dto";
import {JwtGuard} from "../auth/guards/jwt.guard";


@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) {}

    @UseGuards(JwtGuard)
    @Post('favorite')
    async addProductToFavorite(@Body(new ValidationPipe()) body: AddToFavoriteDto, @Request() req) {
        const user = req.user
        const product = await this.usersService.addProductToFavorite(body.productId, user.id)
        return {product}
    }

    @UseGuards(JwtGuard)
    @Delete('favorite/:productId')
    async removeProductFromFavorite(@Param('productId') productId: string, @Request() req) {
        const user = req.user
        return await this.usersService.removeProductFromFavorite(parseInt(productId), user.id)
    }

    @UseGuards(JwtGuard)
    @Get('me')
    async profile(@Request() req) {
        const user = req.user
        const profile = await this.usersService.getProfile({id: user.id})
        return {profile}
    }
}
