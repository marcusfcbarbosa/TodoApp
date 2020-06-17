import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EventoSchema } from './schemas/evento.schema';
import { PalestranteSchema } from './schemas/palestrante.schema';
import { LoteSchema } from './schemas/lote.schema';
import { RedeSocialSchema } from './schemas/rede-social.schema';

import { EventoController } from './controllers/evento.controller';
import { RedeSocialController } from './controllers/rede-social.controller';
import { LoteController } from './controllers/lote.controller';
import { PalestranteController } from './controllers/palestrante.controller';

// import { EventoService } from './services/evento.service';
// import { PalestranteService } from './services/palestrante.service';
// import { LoteService } from './services/lote.service';
// import { RedeSocialService } from './services/rede-social.service';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { BackOfficeServices } from './services';
import { UserSchema } from './schemas/user.schema';
import { UserController } from './controllers/user.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AccountController } from './controllers/account.controller';

@Module({
    imports:
        [
            HttpModule,
            PassportModule.register({ defaultStrategy: 'jwt' }),
            JwtModule.register(
                {
                    secretOrPrivateKey: process.env.SECRET_KEY,
                    signOptions: {
                        expiresIn: 3600
                    },
                }),
            MongooseModule.forFeature(
                [
                    {
                        name: 'Evento',
                        schema: EventoSchema,
                    },
                    {
                        name: 'Palestrante',
                        schema: PalestranteSchema,
                    },
                    {
                        name: 'Lote',
                        schema: LoteSchema,
                    },
                    {
                        name: 'RedeSocial',
                        schema: RedeSocialSchema,
                    }, {
                        name: 'User',
                        schema: UserSchema,
                    },
                ])],
    controllers: [
        EventoController,
        PalestranteController,
        LoteController,
        RedeSocialController,
        UserController,
        AccountController

    ],
    providers: [
        ...BackOfficeServices
        , AuthService
        , JwtStrategy
    ]
})

export class BackofficeModule { }
