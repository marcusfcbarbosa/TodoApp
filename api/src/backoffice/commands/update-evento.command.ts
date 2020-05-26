'use strict';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateEventoCommand {
    @ApiProperty()
    public readonly tema: string;
    @ApiProperty()
    public readonly local: string;
    @ApiProperty()
    public active: boolean;
}
