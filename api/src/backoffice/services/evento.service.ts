import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Evento } from '../models/evento.model';
import { QueryCommand } from '../commands/query.command';

@Injectable()
export class EventoService {
    constructor(@InjectModel('Evento') private readonly model: Model<Evento>) {
    }
    async create(data: Evento): Promise<Evento> {
        const user = new this.model(data);
        return await user.save();
    }
    async findAll(): Promise<Evento[]> {
        return await this.model.find({}).exec();
    }
    async query(model: QueryCommand): Promise<Evento[]> {
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
