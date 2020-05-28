import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EventoSchema } from './schemas/evento.schema';
import { PalestranteSchema } from './schemas/palestrante.schema';
import { LoteSchema } from './schemas/lote.schema';

import { EventoController } from './controllers/evento.controller';

import { EventoService } from './services/evento.service';
import { RedeSocialSchema } from './schemas/rede-social.schema';

@Module({
    imports:
        [
            HttpModule,
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
                    },
                ])],
    controllers: [
        EventoController,
    ],
    providers: [
        EventoService,
    ],
})

export class BackofficeModule { }
