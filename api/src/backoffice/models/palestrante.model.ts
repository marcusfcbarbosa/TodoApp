'use strict';
import { RedeSocial } from './rede-social.model';
import { Evento } from './evento.model';

export class Palestrante {
    constructor(
        public documento: string,
        public nome: string,
        public telefone: string,
        public email: string,
        public eventos: Evento[],
        public redeSociais: RedeSocial[],
        public active: boolean) {
    }
}
