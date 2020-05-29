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

import { EventoService } from './services/evento.service';
import { PalestranteService } from './services/palestrante.service';
import { LoteService } from './services/lote.service';
import { RedeSocialService } from './services/rede-social.service';

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
        PalestranteController,
        LoteController,
        RedeSocialController,
    ],
    providers: [
        EventoService,
        PalestranteService,
        LoteService,
        RedeSocialService,
    ],
})

export class BackofficeModule { }
