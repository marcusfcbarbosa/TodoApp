import { Model } from 'mongoose';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../models/user.model";


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly model: Model<User>) {
    }
    
    async create(data: User): Promise<User> {
        const user = new this.model(data);
        return await user.save();
    }
    
    async findAll(): Promise<User[]> {
        return await this.model.find({}).exec();
    }
}