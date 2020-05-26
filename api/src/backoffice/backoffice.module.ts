import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventoSchema } from './schemas/evento.schema';
import { EventoController } from './controllers/evento.controller';
import { EventoService } from './services/evento.service';

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
                ])],
    controllers: [
        EventoController,
    ],
    providers: [
        EventoService,
    ],
})

export class BackofficeModule {}
