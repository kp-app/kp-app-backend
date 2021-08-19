import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./jwt.strategy";
import {UsersModule} from "../users/users.module";

@Module({
    imports: [
        UsersModule,
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
