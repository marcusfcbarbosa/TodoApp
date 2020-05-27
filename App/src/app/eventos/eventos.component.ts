import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  public title = 'Eventos';
  eventos: any = [];
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  filtroLista = '';
  constructor(private http: HttpClient) { }

  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  getEventos() {
    this.eventos = this.http.get("http://localhost:3000/v1/Eventos").subscribe(
      response => {
        this.eventos = response.data;
      }
      , error => {
        console.log(error);
      }
    );
  }
  ngOnInit() {
    this.getEventos();
  }
}