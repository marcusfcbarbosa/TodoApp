'use strict';

import { Evento } from "./evento.model";
import { Palestrante } from "./palestrante.model";

export class RedeSocial {
    constructor(
        public nome: string,
        public url: string,
        public evento: Evento,
        public palestrante: Palestrante,
        public active: boolean) {
    }
}
