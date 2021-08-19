export class CreateUserDto {
    username!: string
    email?: string
    password!: string
    isAdmin?: boolean
}
