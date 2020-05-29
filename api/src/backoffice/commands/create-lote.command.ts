'use strict';
import { ApiProperty } from '@nestjs/swagger';
export class CreateLoteCommand {

    @ApiProperty()
    public readonly nome: string;

    @ApiProperty()
    public readonly preco: number;

    @ApiProperty()
    public readonly dataInicio: Date;

    @ApiProperty()
    public readonly dataFim: Date;

    @ApiProperty()
    public readonly active: boolean;
}
