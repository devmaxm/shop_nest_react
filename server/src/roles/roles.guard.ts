import {Injectable, CanActivate, ExecutionContext} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {JWT_SECRET_KEY} from "../../config";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        const requiredRole = this.reflector.get<string>('role', context.getHandler())
        if (!requiredRole) {
            return true
        }

        const request = context.switchToHttp().getRequest()
        const token = request.headers.authorization.split(' ')[1]
        if (!token) {
            return false
        }

        try {
            const payload = this.jwtService.verify(token, {publicKey: JWT_SECRET_KEY})
            request.user = payload
            return payload.role == requiredRole
        } catch (e) {
            return false
        }

    }
}