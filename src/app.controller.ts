import {Controller, Post, Request} from '@nestjs/common'
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

    // Finish
    @Public()
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}
