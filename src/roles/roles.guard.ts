import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {Reflector} from "@nestjs/core";
import {Role} from "./enums/roles.enum";
import {ROLES_KEY} from "./roles.decorator";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly authService: AuthService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        // get token, decrypt it and check role. If role is sufficient, return true
        const user: any = this.authService.decodeUser(
            context.switchToHttp().getRequest().headers.authorization
                .split('Bearer ').slice(-1)[0]
        )

        return requiredRoles.some(role => role === user.role)
    }
}