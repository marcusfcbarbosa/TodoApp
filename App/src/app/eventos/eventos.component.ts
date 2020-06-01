import { Component, OnInit } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { Evento } from '../models/Evento';


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
  _filtroLista: string;
  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }
  eventosFiltrados: any = [];
  constructor(private eventoService: EventoService) { }

  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  filtrarEventos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1);
  }
  getEventos() {
    this.eventos = this.eventoService.getEventos()
    .subscribe(
      (_eventos: Evento[]) => {

        this.eventos = _eventos;
        this.eventosFiltrados = this.eventos;
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