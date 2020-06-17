'use strict'
import { ApiProperty } from '@nestjs/swagger';

export class AuthenticateDto {
    @ApiProperty()
    public username: string;
    @ApiProperty()
    public password: string;

}
