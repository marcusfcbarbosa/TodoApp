import { Controller, Post, Body, HttpException, HttpStatus, UseInterceptors } from '@nestjs/common';
import { Result } from 'src/shared/result';
import { CreateEventoContract } from '../contracts/create-evento.contract';
import { ValidatorInterceptor } from 'src/shared/interceptors/validator.interceptor';
import { CreateEventoCommand } from '../commands/create-evento.command';


@Controller('v1/Eventos')
export class EventoController{

    constructor() {}

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateEventoContract()))
    async post(@Body() body: CreateEventoCommand) {
        try {
            // const customer = new Customer(body.name, body.document, body.email, user, [], null, null, null);
            // await this.customerService.create(customer);
            //return new Result('Inserido com sucesso', true, body.roles, null);
        } catch (error) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}
