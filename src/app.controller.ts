import {Body, Controller, Post} from '@nestjs/common'
import {AppService} from './app.service'
import {AuthService} from "./auth/auth.service";
import {Public} from "./CustomDecorators";

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private authService: AuthService
    ) {
    }

    @Public()
    @Post('auth/login')
    async login(@Body() credentials: any) {
        return this.authService.login(await this.authService.validateUser(credentials.username, credentials.password));
    }
}
