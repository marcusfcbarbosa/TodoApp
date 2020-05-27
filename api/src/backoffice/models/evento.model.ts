'use strict';
export class Evento {
    constructor(
        public tema: string,
        public local: string,
        public quantidadePessoas: number,
        public lote: string,
        public image: string,
        public active: boolean) {
    }
}
