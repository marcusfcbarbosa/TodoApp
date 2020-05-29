import { Controller, Post, Body, HttpException, HttpStatus, UseInterceptors, Get, UploadedFile, FileInterceptor } from '@nestjs/common';
import { ValidatorInterceptor } from '../../shared/interceptors/validator.interceptor';
import { Result } from '../../shared/result';
import { LoteService } from '../services/lote.service';
import { CreateLoteContract } from '../contracts/create-lote.contract';
import { CreateLoteCommand } from '../commands/create-lote.command';
import { Lote } from '../models/lote.model';

@Controller('v1/Lotes')
export class LoteController {
    constructor(private readonly loteService: LoteService) { }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateLoteContract()))
    async post(@Body() command: CreateLoteCommand) {
        try {
            let palestrante = await this.loteService.create(new Lote(command.nome
                , command.preco
                , command.dataInicio
                , command.dataFim
                , null //pegar o Evento
                , command.active));
            return palestrante;
        } catch (error) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Get('')
    async get() {
        try {
            const eventos = await this.loteService.findAll();
            return eventos;
        } catch (error) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}
