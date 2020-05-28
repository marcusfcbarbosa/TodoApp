import { Controller, Post, Body, HttpException, HttpStatus, UseInterceptors, Get, UploadedFile, FileInterceptor } from '@nestjs/common';
import { Result } from 'src/shared/result';
import { CreateEventoContract } from '../contracts/create-evento.contract';
import { ValidatorInterceptor } from 'src/shared/interceptors/validator.interceptor';
import { CreateEventoCommand } from '../commands/create-evento.command';
import { EventoService } from '../services/evento.service';
import { Evento } from '../models/evento.model';

@Controller('v1/Eventos')
export class EventoController {

    constructor(private readonly eventoService: EventoService) { }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateEventoContract()))
    async post(@Body() command: CreateEventoCommand) {
        try {
            let evento = await this.eventoService.create(new Evento(command.tema,
                command.local
                , command.quantidadePessoas
                , command.lote
                , command.image
                , command.active));
            return evento;
        } catch (error) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Get('')
    async get() {
        try {
            const eventos = await this.eventoService.findAll();
            return eventos;
        } catch (error) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file) {
        console.log(file);
    }
}
