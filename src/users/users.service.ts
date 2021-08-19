import {Injectable} from '@nestjs/common'
import {CreateUserDto} from './dto/create-user.dto'
import {UpdateUserDto} from './dto/update-user.dto'
import {InjectModel} from "@nestjs/mongoose"
import {User, UserDocument} from "./schemas/users.schema"
import {Model} from "mongoose"

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {
    }

    async create(createUserDto: CreateUserDto): Promise<any> {
        const createdUser: UserDocument = new this.userModel(createUserDto)
        let savedUser = await createdUser.save()
        return savedUser
    }

    async findAll() {
        const users = await this.userModel.find({}).exec()
        return users
    }

    async findOne(username: string) {
        const user = await this.userModel.findOne({username: username}).exec()
        return user
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
