import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from "mongoose";

@Schema()
export class User extends Document{
    @Prop({type: String, required:true})
    name: string;

    @Prop({type: String, required:true, unique: true})
    password: string;

    @Prop({type: String, required:true, unique: true})
    email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);