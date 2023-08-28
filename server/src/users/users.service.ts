import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";

import {User} from "./users.entity";
import {CreateUserDto} from "./users.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "../products/products.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        public userRepository: Repository<User>,
        @InjectRepository(Product)
        public productRepository: Repository<Product>,
    ) {
    }

    async create(data: CreateUserDto) {
        const createdUser = await this.userRepository.create({...data})
        await this.userRepository.save(createdUser)
        const {password, createdAt, ...user} = createdUser
        return user
    }

    async findOne(query): Promise<User> {
        const user = await this.userRepository.findOne({
                where: query,
            }
        )
        return user
    }
//    profile
    async getProfile(query): Promise<any> {
        const user = await this.userRepository.findOne({
                where: query,
                relations: {
                    favorite: true
                }
            }
        )
        return user
    }

//    favorite
    async addProductToFavorite(productId: number, userId: number) {
        const user = await this.getProfile({id: userId})
        const product = await this.productRepository.findOneBy({id: productId})
        user.favorite.push(product)
        await this.userRepository.save(user)
        return product
    }

    async removeProductFromFavorite(productId: number, userId: number) {
        const user = await this.getProfile({id: userId})
        const newFavorite = user.favorite.filter((p) => {
            return p.id !== productId
        })
        user.favorite = newFavorite
        await this.userRepository.save(user)
        return user
    }
}
