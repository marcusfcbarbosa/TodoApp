'use strict';
import { ApiProperty } from '@nestjs/swagger';
export class CreateRedeSocialCommand {

    @ApiProperty()
    public readonly nome: string;

    @ApiProperty()
    public readonly url: string;

    @ApiProperty()
    public readonly active: boolean;
}
