import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersService} from "../users/users.service";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./jwt.strategy";

@Module({
    imports: [
        UsersService,
        PassportModule,
        JwtModule.register({
            secret: process.env["jwtSecret "],
            signOptions: {
                expiresIn: process.env["expiresIn"]
            }
        })
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {
}
