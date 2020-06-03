'use strict';
import { Injectable } from '@nestjs/common';
import { IContract } from '../../shared/icontract';
import { Flunt } from '../../shared/utils/flunt';
import { UpdateEventoCommand } from '../commands/update-evento.command';


@Injectable()
export class UpdateEventoContract implements IContract {
    errors: any[];
    validate(command: UpdateEventoCommand ): boolean {
        const flunt = new Flunt();
        flunt.hasMinLen(command.tema, 5, 'Nome necessita de pelo menos 5 caracteres');
        flunt.hasMinLen(command.local, 5, 'Local necessita de pelo menos 5 caracteres');
        flunt.hasMinLen(command.lote, 5, 'Lote necessita de pelo menos 5 caracteres');
        flunt.isEqual(command.quantidadePessoas, 0, 'Preencha quantdade de pessoas');
        this.errors = flunt.errors;
        return flunt.isValid();
    }
}
