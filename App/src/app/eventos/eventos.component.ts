import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { Evento } from '../models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

//para deixar o datepicker no formato brasileiro
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})


export class EventosComponent implements OnInit {
  public title = 'Eventos';
  eventos: Evento[];
  evento: Evento;
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  modoSalvar = '';
  eventosFiltrados: any = [];
  _filtroLista: string;
  registerForm: FormGroup;

  constructor(
    private eventoService: EventoService
    , private modlService: BsModalService
    , private fb: FormBuilder
    , private localeService: BsLocaleService) {

    //definir o datePicker como formato pt-br
    this.localeService.use('pt-br');
  }

  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  fecharModal(template: any) {
    template.hide();
  }

  validation() {
    //validando com FormBuilder
    this.registerForm = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
      , local: ['', Validators.required]
      , lote: ['', Validators.required]
      , dataInicio: ['', Validators.required]
      , quantidadePessoas: ['', [Validators.required, Validators.maxLength(120000)]]
      , telefone: ['', Validators.required]
      , email: ['', [Validators.required, Validators.email]]
    });

    //validando com FormGroup
    // this.registerForm = new FormGroup({
    //   tema: new FormControl(''
    //     ,
    //     [Validators.required,
    //     Validators.minLength(4), Validators.maxLength(50)])
    //   , local: new FormControl('', Validators.required)
    //   , dataInicio: new FormControl('', Validators.required)
    //   , quantidadePessoas: new FormControl(''
    //     , [Validators.required, Validators.maxLength(120000)])
    //   , telefone: new FormControl('', Validators.required)
    //   , email: new FormControl('',
    //     [Validators.required, Validators.email])
    // });
  }

  editar(evento: Evento, template: any) {
    this.modoSalvar = 'put';
    console.log(this.modoSalvar);
    this.openModal(template);
    this.evento = evento;
    this.registerForm.patchValue(evento);
  }

  novo(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }

  salvarAlteracao(template: any) {
    if (this.registerForm.valid) {
      this.evento = Object.assign({ _id: this.evento._id }, this.registerForm.value);
      if (this.modoSalvar == 'post') {
        this.eventoService.postEvento(this.evento)
          .subscribe(
            (novoEvento: Evento) => {
              template.hide();
              this.getEventos();
            }, error => {
              console.error(error);
            }
          );
      }
      if (this.modoSalvar == 'put') {
        this.eventoService.putEvento(this.evento)
          .subscribe(
            (novoEvento: Evento) => {
              template.hide();
              this.getEventos();
            }, error => {
              console.error(error);
            }
          );
      }
    }
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
    this.eventoService.getEventos()
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