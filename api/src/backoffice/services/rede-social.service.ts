import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QueryCommand } from '../commands/query.command';
import { RedeSocial } from '../models/rede-social.model';

@Injectable()
export class RedeSocialService {
    constructor(@InjectModel('RedeSocial') private readonly model: Model<RedeSocial>) {
    }
    async create(data: RedeSocial): Promise<RedeSocial> {
        const user = new this.model(data);
        return await user.save();
    }
    async findAll(): Promise<RedeSocial[]> {
        return await this.model.find({}).exec();
    }
    async query(model: QueryCommand): Promise<RedeSocial[]> {
        return await this.model
            .find(model.query,
                model.fields,
                {
                    skipe: model.skip,
                    take: model.take,
                })
            .sort(model.sort)
            .exec();
    }
}
