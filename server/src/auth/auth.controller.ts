import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UseGuards,
    HttpException,
    HttpStatus,
} from '@nestjs/common';

import {AuthService} from "./auth.service";
import {UsersService} from "../users/users.service";

import {LocalGuard} from "./guards/local.guard";
import {JwtGuard} from "./guards/jwt.guard";
import {RolesGuard} from "../roles/roles.guard";

import {Role} from "../roles/roles.decorator";
import {RolesEnum} from "../roles/roles.enum";

import * as bcrypt from "bcrypt"
import {BCRYPT_SALT} from "../../config";



@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ) {
    }

    @UseGuards(LocalGuard)
    @Post('login')
    async login(@Req() req) {
        return await this.authService.login(req.user)
    }

    @Post('register')
    async register(
        @Body('email') email: string,
        @Body('fullName') fullName: string,
        @Body('password') password: string,
        @Body('password2') password2: string,
    ) {
        const userExist = await this.usersService.findOne({email})
        if (userExist) {
            throw new HttpException('Пользователь с такми email уже зарегестрирован', HttpStatus.CONFLICT)
        }
        if (password !== password2) {
            throw new HttpException('Пароли не совпадают', HttpStatus.UNAUTHORIZED)
        }

        const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT)
        const response = await this.usersService.create({email, password: hashedPassword, fullName})
        const token = await this.authService.login(response)
        return {user: response, token}
    }


    @UseGuards(JwtGuard)
    @Get('check')
    async checkAuth(@Req() req) {
        return this.authService.checkAuth(req.user)
    }
}
