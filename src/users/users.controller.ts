import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {Roles} from "../roles/roles.decorator";
import {Role} from "../roles/enums/roles.enum";

@Roles(Role.Admin)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }


    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }
    
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':username')
    findOne(@Param('username') username: string) {
        return this.usersService.findOne(username);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
