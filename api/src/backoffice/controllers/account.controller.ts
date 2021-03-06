import { Controller, Post, Get, UseGuards, UseInterceptors, HttpException, HttpStatus, Req, Body } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { AuthenticateDto } from '../dtos/authenticate-dto';
import { Guid } from 'guid-typescript'
import { AuthService } from '../services/auth.service';
import { Result } from 'src/shared/result';

@Controller('v1/Accounts')
export class AccountController {
    constructor(private authService: AuthService,
        private readonly accountService: AccountService) {
    }

    @Post('authenticate')
    async post(@Body() model: AuthenticateDto): Promise<any> {
        const user = await this.accountService.authenticate(model.username, model.password);
        if (!user) {
            throw new HttpException(new Result('Usuário ou senha inválida', false, null, null), HttpStatus.NOT_FOUND);
        }
        if (!user.active) {
            throw new HttpException(new Result('Usuário inativo', false, null, null), HttpStatus.UNAUTHORIZED);
        }
        const token = await this.authService.createToken(
            user.username,
            user.email);
            
        return new Result(null, true, {
            name: user.username,
            token: token
        }, null);
    }

    // @Post('reset-password')
    // async resetpassword(@Body() model: ResetPasswordDto): Promise<any> {
    //     try {
    //         const password = Guid.create().toString().substring(0, 8).replace('-', '');
    //         await this.accountService.update(model.document, { password: password });
    //         return new Result('uma nova senha foi enviada para o seu e-mail', true, null, null);
    //     } catch (error) {
    //         throw new HttpException(new Result('Não foi possível restaurar a senha', false, null, null), HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // @Post('change-password')
    // @UseGuards(SharedJwtAuthGuard)//para esse tipo de ação o usuario deve ter um token válido
    // @UseInterceptors(new ValidatorInterceptor(new ChangePasswordContract()))
    // async changepassword(@Req() request, @Body() model: ChangePasswordDto): Promise<any> {
    //     try {
    //         await this.accountService.update(request.user.document, { password: model.newPassword });
    //         return new Result('Senha alterada com sucesso!', true, null, null);
    //     } catch (error) {
    //         throw new HttpException(new Result('Não foi possível alterar a senha',
    //             false, null, null), HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // @Post('refresh')
    // @UseGuards(SharedJwtAuthGuard)
    // async createToken(@Req() request): Promise<any> {
    //     const token = await this.authService.createToken(
    //         request.user.username,
    //         request.user.document,
    //         request.user.email,
    //         request.user.roles);
    //     return new Result(null, true, token, null);
    // }

    // @Get('')
    // @UseGuards(SharedJwtAuthGuard)
    // @UseInterceptors(new RoleInterceptor(['admin']))
    // findAll(@Req() request) {
    //     //SharedJwtAuthGuard que guarda as informacoes armazenadas no TOKEN
    //     //req.user
    //     //SharedJwtAuthGuard preenche o @Req
    //     return request.user;
    // }
}