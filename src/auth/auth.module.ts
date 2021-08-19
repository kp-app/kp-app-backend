import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersService} from "../users/users.service";

@Module({
    imports: [UsersService],
    providers: [AuthService]
})
export class AuthModule {
}
