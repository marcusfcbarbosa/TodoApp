import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QueryCommand } from '../commands/query.command';
import { Lote } from '../models/lote.model';

@Injectable()
export class LoteService {
    constructor(@InjectModel('Lote') private readonly model: Model<Lote>) {
    }
    async create(data: Lote): Promise<Lote> {
        const user = new this.model(data);
        return await user.save();
    }
    async findAll(): Promise<Lote[]> {
        return await this.model.find({}).exec();
    }
    async query(model: QueryCommand): Promise<Lote[]> {
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