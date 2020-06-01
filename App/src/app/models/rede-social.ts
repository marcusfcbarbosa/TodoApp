import { Evento } from "./Evento";
import { Palestrante } from "./palestrante";

export interface RedeSocial {
    nome: string,
    url: string,
    evento: Evento,
    palestrante: Palestrante,
    active: boolean
}
