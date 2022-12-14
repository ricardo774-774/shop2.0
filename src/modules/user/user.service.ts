import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from 'src/modules/user/dtos/user.dto';
import { User } from 'src/modules/user/schemas/user.schema';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>){}

    async getUsers(): Promise<User[]> {
        return this.userModel.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "userId",
                    as: "products"
                }
            },
            {
                $project: {
                    name: 1,
                    password: 1,
                    email: 1,
                    products: 1,
                    _id: 1
                }
            },
            {
                $skip: 0
            },
            {
                $limit: 10
            },
        ]);        
    }

    async getAUser(userId: string): Promise<User> {
        const User = await this.userModel.findById(userId); 
        return User;           
    }

    async createUser(createUserDTO: CreateUserDTO): Promise<User> {          
        const UserSaved = new this.userModel(createUserDTO); 
        return await UserSaved.save();
    }

    async updateUser(userId: string, createUserDTO: CreateUserDTO): Promise<User> {
        const UserUpdated = await this.userModel.findByIdAndUpdate(userId, 
            createUserDTO, { new: true }); 
        return UserUpdated;           
    }

    async deleteUser(userId: string): Promise<User> {
        const UserDeleted = await this.userModel.findByIdAndDelete(userId); 
        return UserDeleted;           
    }
}
