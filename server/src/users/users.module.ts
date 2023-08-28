import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./users.entity";
import { UsersController } from './users.controller';
import {Product} from "../products/products.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Product])],
  exports: [UsersService],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
