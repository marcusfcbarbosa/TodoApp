import { Evento } from "./Evento";
import { RedeSocial } from "./rede-social";

export interface Palestrante {
    documento: string,
    nome: string,
    telefone: string,
    email: string,
    eventos: Evento[],
    redeSociais: RedeSocial[],
    active: boolean
}
