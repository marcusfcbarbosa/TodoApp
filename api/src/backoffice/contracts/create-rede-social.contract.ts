'use strict';
import { Injectable } from '@nestjs/common';
import { IContract } from '../../shared/icontract';
import { Flunt } from '../../shared/utils/flunt';
import { CreateRedeSocialCommand } from '../commands/create-rede-social.command';

@Injectable()
export class CreateRedeSocialContract implements IContract {
    errors: any[];
    validate(command: CreateRedeSocialCommand ): boolean {
        const flunt = new Flunt();
        flunt.hasMinLen(command.nome, 3, 'Nome necessita de pelo menos 3 caracteres');
        flunt.isRequired(command.url, 'Informe a url da rede social');
        this.errors = flunt.errors;
        return flunt.isValid();
    }
}
