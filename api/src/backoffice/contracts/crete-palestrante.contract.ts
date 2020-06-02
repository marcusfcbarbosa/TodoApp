'use strict';
import { Injectable } from '@nestjs/common';
import { IContract } from '../../shared/icontract';
import { Flunt } from '../../shared/utils/flunt';
import { CreatePalestranteCommand } from '../commands/create-palestrante.command';

@Injectable()
export class CreatePalestranteContract implements IContract {
    errors: any[];
    validate(command: CreatePalestranteCommand): boolean {
        const flunt = new Flunt();
        flunt.isCpf(command.documento, 'Documento inválido.');
        flunt.hasMinLen(command.nome, 3, 'Nome necessita de pelo menos 3 caracteres');
        flunt.isEmail(command.email, 'E-mail inválido');
        flunt.hasMinLen(command.telefone, 11, 'Telefone com DDD precisa de 11 caracteres');
        this.errors = flunt.errors;
        return flunt.isValid();
    }
}
