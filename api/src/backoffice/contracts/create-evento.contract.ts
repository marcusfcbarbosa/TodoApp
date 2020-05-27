'use strict';
import { Injectable } from '@nestjs/common';
import { IContract } from 'src/shared/icontract';
import { Flunt } from 'src/utils/flunt';
import { CreateEventoCommand } from '../commands/create-evento.command';

@Injectable()
export class CreateEventoContract implements IContract {
    errors: any[];
    validate(command: CreateEventoCommand): boolean {
        const flunt = new Flunt();
        flunt.hasMinLen(command.tema, 5, 'Nome necessita de pelo menos 5 caracteres');
        flunt.hasMinLen(command.local, 5, 'Local necessita de pelo menos 5 caracteres');
        flunt.hasMinLen(command.lote, 5, 'Lote necessita de pelo menos 5 caracteres');
        flunt.isEqual(command.quantidadePessoas, 0, 'Preencha quantdade de pessoas');
        this.errors = flunt.errors;
        return flunt.isValid();
    }
}
