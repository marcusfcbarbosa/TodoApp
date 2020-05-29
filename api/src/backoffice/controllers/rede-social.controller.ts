import { Controller, Post, Body, HttpException, HttpStatus, UseInterceptors, Get, UploadedFile, FileInterceptor } from '@nestjs/common';
import { ValidatorInterceptor } from '../../shared/interceptors/validator.interceptor';
import { Result } from '../../shared/result';
import { RedeSocial } from '../models/rede-social.model';
import { RedeSocialService } from '../services/rede-social.service';
import { CreateRedeSocialCommand } from '../commands/create-rede-social.command';
import { CreateRedeSocialContract } from '../contracts/create-rede-social.contract';

@Controller('v1/RedeSociais')
export class RedeSocialController {
    constructor(private readonly redeSocialService: RedeSocialService) { }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateRedeSocialContract()))
    async post(@Body() command: CreateRedeSocialCommand) {
        try {
            let redeSocial = await this.redeSocialService.create(new RedeSocial(
                command.nome
                , command.url
                , null// evento
                , null// palestrante
                , command.active));
            return redeSocial;
        } catch (error) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Get('')
    async get() {
        try {
            const eventos = await this.redeSocialService.findAll();
            return eventos;
        } catch (error) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}
