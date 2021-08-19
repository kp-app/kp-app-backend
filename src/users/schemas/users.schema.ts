import {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type UsersDocument = User & Document

@Schema()
export class User {
    @Prop({required: true})
    username!: string

    @Prop({required: false})
    email?: string

    // TODO ideally, don't store this as string in mongo. Not really secure
    @Prop({required: true})
    password: string

    @Prop({required: false})
    isAdmin?: boolean
}

export const UserSchema = SchemaFactory.createForClass(User)