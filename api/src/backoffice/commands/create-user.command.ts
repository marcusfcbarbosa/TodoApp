'use strict';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserCommand {

    @ApiProperty()
    public readonly username: string;

    @ApiProperty()
    public readonly email: string;

    @ApiProperty()
    public readonly password: string;
    
    @ApiProperty()
    public readonly active: boolean;
}

 