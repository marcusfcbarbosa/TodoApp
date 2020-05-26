import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  public title = 'Eventos';

  eventos: any = [
    {
      tema: 'Angular',
      local: 'São Paulo'
    },
    {
      tema: 'Angular',
      local: 'BH'
    }
  ];

  constructor(private http: HttpClient) { }


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
