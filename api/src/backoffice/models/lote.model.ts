'use strict';

import { Evento } from "./evento.model";

export class Lote {
    constructor(
        public nome: string,
        public preco: number,
        public dataInicio: Date,
        public dataFim: Date,
        public evento: Evento ,
        public active: boolean) {
    }
}
