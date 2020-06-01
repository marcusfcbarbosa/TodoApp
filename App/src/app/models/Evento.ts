import { Palestrante } from "./palestrante";
import { RedeSocial } from "./rede-social";
import { Lote } from "./lote";

export interface Evento {
    tema: string,
    local: string,
    quantidadePessoas: number,
    lote: string,
    image: string,
    palestrantes: Palestrante[],
    redeSociais: RedeSocial[],
    lotes: Lote[],
    active: boolean
}
