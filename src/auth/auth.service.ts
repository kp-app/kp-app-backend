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
            const {password, ...result} = user
            return result
        }
        return null
    }

    async login(user: any) {
        const token = this.configService.get<string>('config.jwtToken')
        const payload = {username: user.username, sub: user._id}
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
