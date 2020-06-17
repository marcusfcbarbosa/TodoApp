import { LoteService } from "./lote.service";
import { PalestranteService } from "./palestrante.service";
import { RedeSocialService } from "./rede-social.service";
import { EventoService } from "./evento.service";
import { UserService } from "./user-service";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "../strategies/jwt.strategy";
import { AccountService } from "./account.service";


export const BackOfficeServices = [
  EventoService
  , LoteService
  , PalestranteService
  , RedeSocialService
  , UserService
  , AccountService
];