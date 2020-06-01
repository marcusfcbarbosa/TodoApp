import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../models/Evento';

@Injectable({
    providedIn: 'root'
})

export class EventoService {
    
    baseUrl = 'http://localhost:3000/v1/Eventos';

    constructor(private http: HttpClient) { }

    getEventos(): Observable<Evento[]> {
        return this.http.get<Evento[]>(this.baseUrl);
    }
}
