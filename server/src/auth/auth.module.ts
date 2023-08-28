import {Module} from '@nestjs/common';
import {UsersModule} from "../users/users.module";

import {AuthController} from './auth.controller';

import {LocalStrategy} from "./strategies/local.strategy";
import {JwtStrategy} from "./strategies/jwt.strategy";

import {JwtService} from "@nestjs/jwt";
import {AuthService} from './auth.service';

@Module({
    imports: [UsersModule],
    providers: [AuthService, LocalStrategy, JwtStrategy, JwtService],
    controllers: [AuthController],

})
export class AuthModule {
}
