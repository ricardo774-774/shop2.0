import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from "mongoose";


@Schema({_id: false})
export class User extends Document{
    @Prop({type: Types.ObjectId})
    _id: Types.ObjectId;

    @Prop({type: String, required:true})
    name: string;

    @Prop({type: String, required:true, unique: true})
    password: string;

    @Prop({type: String, required:true, unique: true})
    email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);