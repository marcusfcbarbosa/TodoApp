import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventoSchema } from './schemas/evento.schema';
import { PalestranteSchema } from './schemas/palestrante.schema';
import { LoteSchema } from './schemas/lote.schema';
import { RedeSocialSchema } from './schemas/rede-social.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { BackOfficeServices } from './services';
import { UserSchema } from './schemas/user.schema';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { BackOfficeControllers } from './controllers';

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
        ...BackOfficeControllers

    ],
    providers: [
        ...BackOfficeServices
        , AuthService
        , JwtStrategy
    ]
})

export class BackofficeModule { }
