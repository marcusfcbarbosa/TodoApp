'use strict';
import { ApiProperty } from '@nestjs/swagger';
export class CreatePalestranteCommand {

    @ApiProperty()
    public readonly documento: string;

    @ApiProperty()
    public readonly nome: string;

    @ApiProperty()
    public readonly telefone: string;

    @ApiProperty()
    public readonly email: string;

    @ApiProperty()
    public active: boolean;
}
