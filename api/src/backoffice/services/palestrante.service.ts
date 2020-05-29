import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QueryCommand } from '../commands/query.command';
import { Palestrante } from '../models/palestrante.model';

@Injectable()
export class PalestranteService {
    constructor(@InjectModel('Palestrante') private readonly model: Model<Palestrante>) {
    }
    async create(data: Palestrante): Promise<Palestrante> {
        const user = new this.model(data);
        return await user.save();
    }

    async findAll(): Promise<Palestrante[]> {
        return await this.model.find({}).exec();
    }
    
    async query(model: QueryCommand): Promise<Palestrante[]> {
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