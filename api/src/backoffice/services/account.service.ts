import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Md5 } from 'md5-typescript'
import { User } from '../models/user.model';

@Injectable()
export class AccountService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>) {
    }
    async authenticate(username: string, password: string): Promise<User> {
        var user = await this.userModel
            .findOne({ username: username })
            .exec();

        const pass = await Md5.init(`${password}${process.env.SALT_KEY}`);
        if (pass.toString() == user.password.toString()) {
            return user;
        } else {
            return null;
        }
    }
}