import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../models/Evento';
import { Constantes } from '../utils/Constantes';

@Injectable({
    providedIn: 'root'
})

export class EventoService {
    
    baseUrl = Constantes.END_POINT_API;

    constructor(private http: HttpClient) { }

    getEventos(): Observable<Evento[]> {
        return this.http.get<Evento[]>(this.baseUrl);
    }

    postEvento(evento:Evento) {
        return this.http.post(`${this.baseUrl}`,evento);
    }

    putEvento(evento:Evento) {
        console.warn(evento._id);
        return this.http.put(`${this.baseUrl}/${evento._id}`,evento);
    }


    getEventoById(id: string): Observable<Evento> {
        return this.http.get<Evento>(`${this.baseUrl}/${id}`);
    }

    getEventoByTema(tema: string): Observable<Evento> {
        return this.http.get<Evento>(`${this.baseUrl}/getByTema/${tema}`);
    }
}