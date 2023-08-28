import {Controller, Param, Post} from '@nestjs/common';
import {RolesService} from "./roles.service";

@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) {
    }

    @Post('admin/:userId')
    async changeRoleToAdmin(@Param('userId') userId: number) {
        return await this.rolesService.changeRoleToAdmin(userId)
    }
}
