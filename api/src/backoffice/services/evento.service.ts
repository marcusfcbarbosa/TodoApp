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
    
    async delete(id: string){
        await this.model.find({ _id: id }).remove().exec();
    }

    async findById(id: string): Promise<Evento[]> {
        return await this.model.find({ _id: id }).exec();
    }
    async findByTema(tema: string): Promise<Evento[]> {
        return await this.model.find({ tema: tema }).exec();
    }

    async update(id: string, data: Evento): Promise<Evento> {
        return await this.model.findOneAndUpdate({ _id: id }, data);
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
