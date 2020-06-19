import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FILE } from 'dns';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  user: User;

  constructor(public fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.validation();
  }


  cadastrarUsuario() {
    if (this.registerForm.valid) {
      this.user = Object.assign({
        password: this.registerForm.get('passwords.password').value
      },this.registerForm.value);
      console.warn(this.user);
    }
  }

  validation() {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
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
