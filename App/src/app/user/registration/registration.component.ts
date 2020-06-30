import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { User } from '../../models/user';
import { Result } from '../../models/result';
import { throws } from 'assert';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  user: User

  constructor(public fb: FormBuilder,
    private toastr: ToastrService,
    public router: Router,
    public authService: AuthService) { }

  ngOnInit() {
    this.validation();
  }

  exibeErro(erro) {
    var validacao = Array.from(erro);
    validacao.forEach(function(value, index) {
      this.toastr.error(value);
    }.bind(this));
  }

  cadastrarUsuario() {
    if (this.registerForm.valid) {
      this.user = Object.assign({
        password: this.registerForm.get('passwords.password').value
      }, this.registerForm.value);
      
      this.authService.register(this.user).subscribe(
        (retorno: Result) => {
          if (retorno.success) {
            this.router.navigate(['user/login']);
            this.toastr.success('Cadastro Realizado');
          } else {
            var validacao = Array.from(retorno.error);
            validacao.forEach(function (value, index) {
              this.toastr.error(value);
            });
          }
        }
        , error => {
          this.exibeErro(error.error.error);
        }
      );
    }
  }

  validation() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],

      //agrupando
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', Validators.required],
      }, { validator: this.comparaSenhas })
    });
  }

  comparaSenhas(fb: FormGroup) {
    const confirmPassword = fb.get('confirmPassword');
    if (confirmPassword.errors == null || 'mismatch' in confirmPassword.errors) {
      if (fb.get('password').value !== confirmPassword.value) {
        confirmPassword.setErrors({ mismatch: true });
      } else {
        confirmPassword.setErrors(null);
      }
    }
  }


}
