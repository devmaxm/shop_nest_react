import {Injectable} from '@nestjs/common';
import * as bcrypt from "bcrypt";

import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {JWT_SECRET_KEY} from "../../config";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOne({email})
        if (user) {
            const comparePassword = await bcrypt.compare(password, user.password)
            if (comparePassword) {
                const {password, createdAt, ...result} = user
                return result
            }
        }
        return null
    }

    generateToken(user) {
        return this.jwtService.sign({
            id: user.id,
            email: user.email,
            role: user.role,
            fullName: user.fullName,
            isConfirmed: user.isConfirmed
        }, {privateKey: JWT_SECRET_KEY})
    }

    async login(user) {
        const {createdAt, ...cleanUser} = user
        return {token: this.generateToken(user), user: cleanUser}
    }

    async checkAuth(user) {
        const {iat, ...cleanUser} = user
        return {token: this.generateToken(user), user: cleanUser}
    }
}
