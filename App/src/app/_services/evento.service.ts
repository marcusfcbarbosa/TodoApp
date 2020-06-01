import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EventoService {
    baseUrl = 'http://localhost:3000/v1/Eventos';
    
    constructor(private http: HttpClient) { }

    getEventos() {
        return this.http.get(this.baseUrl);
    }
}
