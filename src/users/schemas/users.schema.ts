import {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type UserDocument = User & Document

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
    role: string
}

export const UserSchema = SchemaFactory.createForClass(User)