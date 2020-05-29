import { Controller, Post, Body, HttpException, HttpStatus, UseInterceptors, Get, UploadedFile, FileInterceptor } from '@nestjs/common';
import { CreatePalestranteContract } from '../contracts/crete-palestrante.contract';
import { ValidatorInterceptor } from '../../shared/interceptors/validator.interceptor';
import { CreatePalestranteCommand } from '../commands/create-palestrante.command';
import { Result } from '../../shared/result';
import { PalestranteService } from '../services/palestrante.service';
import { Palestrante } from '../models/palestrante.model';

@Controller('v1/Palestrantes')
export class PalestranteController {
    constructor(private readonly palestranteService: PalestranteService) { }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreatePalestranteContract()))
    async post(@Body() command: CreatePalestranteCommand) {
        try {
            let palestrante = await this.palestranteService.create(new Palestrante(command.nome
                , command.documento
                , command.telefone
                , command.email
                , []
                , []
                , command.active));
            return palestrante;
        } catch (error) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Get('')
    async get() {
        try {
            const eventos = await this.palestranteService.findAll();
            return eventos;
        } catch (error) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}
