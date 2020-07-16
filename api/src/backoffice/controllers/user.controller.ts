import { Controller, Post, Body, HttpException, HttpStatus, UseInterceptors, Get, UploadedFile, Param, Put, Delete, FileInterceptor, Res } from '@nestjs/common';
import { CreateUserCommand } from "../commands/create-user.command";
import { Result } from 'src/shared/result';
import { User } from '../models/user.model';
import { CreateUserContract } from '../contracts/create-user.contract';
import { ValidatorInterceptor } from 'src/shared/interceptors/validator.interceptor';
import { Md5 } from 'md5-typescript'
import { UserService } from '../services/user-service';
import { Flunt } from 'src/shared/utils/flunt';

@Controller('v1/Users')
export class UserController {
    
    constructor(private readonly userService: UserService) { }
    public errors: any[] = [];
    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateUserContract()))
    async post(@Body() command: CreateUserCommand) {
        try {
            this.errors = [];
            let oldUserName = await this.userService.findByUserName(command.userName);
            if(Object.keys(oldUserName).length != 0){
                this.errors.push('Usuario já existe');
                return new Result('Erro ao processar requisição', false, null, this.errors);    
            }
            const password = await Md5.init(`${command.password}${process.env.SALT_KEY}`);
            let user = await this.userService.create(new User(
                command.name,
                command.userName,
                command.email,
                password,
                true
            ));
            return new Result('', true, user, null);
        } catch (error) {
            return new Result('Erro ao processar requisição', false, null, error);
        }
    }
}