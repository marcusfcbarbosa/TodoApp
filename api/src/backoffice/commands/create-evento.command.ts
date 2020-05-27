'use strict';

import { ApiProperty } from '@nestjs/swagger';

export class CreateEventoCommand {

    @ApiProperty()
    public readonly tema: string;

    @ApiProperty()
    public readonly local: string;

    @ApiProperty()
    public readonly quantidadePessoas: number;

    @ApiProperty()
    public readonly lote: string;

    @ApiProperty()
    public active: boolean;
}
