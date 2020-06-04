
import {
    Controller, Post, Body, HttpException, HttpStatus,
    UseInterceptors,
    Get, UploadedFile,
    Param, Put, Delete, FileInterceptor, Res
} from '@nestjs/common';


import { Result } from '../../shared/result';
import { CreateEventoContract } from '../contracts/create-evento.contract';
import { ValidatorInterceptor } from '../../shared/interceptors/validator.interceptor';
import { CreateEventoCommand } from '../commands/create-evento.command';
import { EventoService } from '../services/evento.service';
import { Evento } from '../models/evento.model';
import { UpdateEventoCommand } from '../commands/update-evento.command';
import { UpdateEventoContract } from '../contracts/update-evento.contract';
import { createWriteStream } from 'fs';

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
                , []
                , []
                , []
                , command.active));
            return evento;
        } catch (error) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    @UseInterceptors(new ValidatorInterceptor(new UpdateEventoContract()))
    async put(@Param('id') id: string, @Body() command: UpdateEventoCommand) {
        try {
            let evento = await this.eventoService.update(id, new Evento(command.tema,
                command.local
                , command.quantidadePessoas
                , command.lote
                , command.image
                , []
                , []
                , []
                , command.active));
            return evento;
        } catch (error) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        try {
            let evento = await this.eventoService.delete(id);
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

    @Get(':id')
    async getById(@Param('id') id: string) {
        try {
            const eventos = await this.eventoService.findById(id);
            return eventos;
        } catch (error) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Get('getByTema/:tema')
    async getByTema(@Param('tema') tema: string) {
        try {
            const eventos = await this.eventoService.findByTema(tema);
            return eventos;
        } catch (error) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    async uploadFile(@UploadedFile() file) {
        console.log(file);
        const path = process.env.UPLOAD_DIRECTORY + file.originalname.replace(/\s/g,'');
        let wstrem = createWriteStream(path);
        wstrem.write(file.buffer);
        wstrem.end();
        return path;
    }

    // @Get('download')
    // async download(@Res() res) {
    //  return res.download("C:\\uploads\\Backend");
    // }
}
