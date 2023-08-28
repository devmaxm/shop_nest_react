import {Module} from '@nestjs/common';
import {APP_GUARD} from "@nestjs/core";
import {RolesGuard} from "./roles.guard";
import {RolesService} from './roles.service';
import {RolesController} from './roles.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/users.entity";
import {JwtService} from "@nestjs/jwt";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [
        RolesService,
        {
            provide: APP_GUARD,
            useClass: RolesGuard
        }, JwtService
    ],
    controllers: [RolesController]
})
export class RolesModule {
}
