import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "../payloads/JwtPayload";
import { AccountService } from "./account.service";


@Injectable()
export class AuthService {
    constructor(
        private readonly accountService: AccountService,
        private readonly jwtService: JwtService
    ) { }

    async createToken(username: string, document: string, email: string, roles: String[]) {
        const user: JwtPayload = {
            username: username,
            email: email
        };
        const accessToken = "Bearer " + this.jwtService.sign(user);
        return {
            expiresIn: 3600,
            accessToken,
        };
    }
    
    async validateUser(payload: JwtPayload): Promise<any> {
        try {
            return payload;
            //return await this.accountService.findOneByUserName(payload.username);
        } catch (error) {
            return false;
        }

    }
}