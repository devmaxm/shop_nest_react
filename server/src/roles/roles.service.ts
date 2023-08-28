import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {User} from "../users/users.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {RolesEnum} from "./roles.enum";

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
    }
    async changeRoleToAdmin(userId: number) {
        const user = await this.userRepository.findOneBy({id: userId})
        user.role = RolesEnum.Admin
        await this.userRepository.save(user)
        return user
    }
}
