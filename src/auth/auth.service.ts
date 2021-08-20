import {Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username)
        if (user && user.password === pass) {
            const {password, ...result} = user.toObject()
            return result
        }
        return null
    }

    // for logout we'll just dump token from frontend state
    async login(user: any) {
        const payload = {username: user.username, sub: user._id, role: user.role}
        return {
            access_token: this.jwtService.sign(payload, {expiresIn: this.configService.get('expiresIn')})
        }
    }

    decodeUser(token: string) {
        const userDecoded = this.jwtService.decode(token)
        return userDecoded
    }
}
