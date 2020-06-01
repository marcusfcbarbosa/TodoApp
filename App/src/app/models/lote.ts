import { Evento } from "./Evento";

export interface Lote {
    nome: string,
    preco: number,
    dataInicio: Date,
    dataFim: Date,
    evento: Evento,
    active: boolean
}
