import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../_services/auth.service';
import { Result } from '../../models/result';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo = 'Login';
  model: any = {};

  constructor(
    private toastr: ToastrService,
    public router: Router,
    public authService: AuthService) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.router.navigate(['/dashboard']);
    }
  }
  
  logSession(token: string, username: string){
    this.authService.logSession(token,username);
  }

  login() {
    this.authService.login(this.model)
      .subscribe(
        (response: Result) => {
          if (response.success) {
            this.logSession(response.data.token,response.data.name);
            this.router.navigate(['/dashboard']);
            this.toastr.success('Logado com Sucesso');
          }
        }, error => {
          this.toastr.error('Falha ao tentar Logar');
        }
      );
  }

}
