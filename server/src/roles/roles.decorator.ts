import {SetMetadata} from "@nestjs/common";
import {RolesEnum} from "./roles.enum";

export const Role = (role: RolesEnum) => SetMetadata('role', role)