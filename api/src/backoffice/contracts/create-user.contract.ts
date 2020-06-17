'use strict';
import { Injectable } from '@nestjs/common';
import { IContract } from '../../shared/icontract';
import { Flunt } from '../../shared/utils/flunt';
import { CreateUserCommand } from '../commands/create-user.command';


@Injectable()
export class CreateUserContract implements IContract {
    errors: any[];
    validate(command: CreateUserCommand): boolean {
        const flunt = new Flunt();
        flunt.hasMinLen(command.username, 5, 'usuario necessita de pelo menos 5 caracteres');
        flunt.isEmail(command.email, 'e-mail inválido.');
        flunt.isRequired(command.password, 'senha é obrigatorio');
        
        
        this.errors = flunt.errors;
        return flunt.isValid();
    }
}
