import { Strategy, ExtractJwt } from 'passport-jwt'
import { PassportStrategy } from "@nestjs/passport/dist/passport/passport.strategy";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from '../payloads/JwtPayload';
import { AuthService } from '../services/auth.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly authService: AuthService) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.SECRET_KEY
            }
        );
    }

    async validate(payload: JwtPayload) {
        const user = await this.authService.validateUser(payload);
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}