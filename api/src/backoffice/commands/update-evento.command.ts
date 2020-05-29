'use strict';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateEventoCommand {
    constructor() {}
    @ApiProperty()
    public readonly tema: string;
    @ApiProperty()
    public readonly local: string;
    @ApiProperty()
    public readonly active: boolean;
}
