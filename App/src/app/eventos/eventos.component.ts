import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { Evento } from '../models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';


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
  eventosFiltrados: any = [];
  _filtroLista: string;
  modalRef: BsModalRef;
  registerForm: FormGroup;

  constructor(
    private eventoService: EventoService
    ,private modlService:BsModalService) { }

  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modlService.show(template);
  }


  validation(){
    this.registerForm = new FormGroup({
      tema:new FormControl(''
      ,
      [Validators.required, 
        Validators.minLength(4),Validators.maxLength(50)])
      ,local:new FormControl('',Validators.required)
      ,dataInicio:new FormControl('',Validators.required)
      ,quantidadePessoas:new FormControl(''
      ,[Validators.required, Validators.maxLength(120000)])
      ,telefone:new FormControl('',Validators.required)
      ,email:new FormControl('',
      [Validators.required,Validators.email])
    });
  }

  salvarAlteracao(){
  
  }


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
    this.validation();
    this.getEventos();
  }
}