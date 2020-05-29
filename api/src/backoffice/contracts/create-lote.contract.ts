'use strict';
import { Injectable } from '@nestjs/common';
import { IContract } from '../../shared/icontract';
import { Flunt } from '../../shared/utils/flunt';
import { CreateLoteCommand } from '../commands/create-lote.command';

@Injectable()
export class CreateLoteContract implements IContract {
    errors: any[];
    validate(command: CreateLoteCommand): boolean {
        const flunt = new Flunt();
        flunt.hasMinLen(command.nome, 3, 'Nome necessita de pelo menos 3 caracteres');
        flunt.isRequired(command.preco, 'Preço é obrigatório');
        flunt.isRequired(command.dataInicio, 'Data inicio é obrigatório');
        flunt.isRequired(command.dataFim, 'Data Fim é obrigatório');
        this.errors = flunt.errors;
        return flunt.isValid();
    }
}
