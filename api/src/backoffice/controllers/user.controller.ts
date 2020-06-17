import { Controller, Post, Body, HttpException, HttpStatus, UseInterceptors, Get, UploadedFile, Param, Put, Delete, FileInterceptor, Res } from '@nestjs/common';
import { CreateUserCommand } from "../commands/create-user.command";
import { Result } from 'src/shared/result';
import { User } from '../models/user.model';
import { CreateUserContract } from '../contracts/create-user.contract';
import { ValidatorInterceptor } from 'src/shared/interceptors/validator.interceptor';
import { Md5 } from 'md5-typescript'
import { UserService } from '../services/user-service';

@Controller('v1/Users')
export class UserController {

    constructor(private readonly userService: UserService) { }
    
    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateUserContract()))
    async post(@Body() command: CreateUserCommand) {
        try {
            const password = await Md5.init(`${command.password}${process.env.SALT_KEY}`);
            let user = await this.userService.create(new User(
                command.username,
                command.email,
                password,
                true
            ));
            return user;
        } catch (error) {
            throw new HttpException(new Result('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}