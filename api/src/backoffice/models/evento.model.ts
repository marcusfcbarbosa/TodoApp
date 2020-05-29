'use strict';

import { Palestrante } from './palestrante.model';
import { RedeSocial } from './rede-social.model';
import { Lote } from './lote.model';

export class Evento {
    constructor(
        public tema: string,
        public local: string,
        public quantidadePessoas: number,
        public lote: string,
        public image: string,
        public palestrantes: Palestrante[],
        public redeSociais: RedeSocial[],
        public lotes: Lote[],
        public active: boolean) {
    }
}
