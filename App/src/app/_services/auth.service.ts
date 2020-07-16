import { Injectable } from '@angular/core';
import { Constantes } from '../utils/Constantes';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Result } from '../models/result';
import { AuthenticateDto } from '../models/authenticate-dto';
import { User } from '../models/user';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseAuthenticationUrl = Constantes.END_POINT_AUTHENTICATION;

  userUrL = Constantes.END_POINT_USER;

  jwtHelper = new JwtHelperService();
  decodeToken: any;

  constructor(private http: HttpClient) { }

  login(model: AuthenticateDto) : Observable<Result> {
    return this.http.post<Result>(`${this.baseAuthenticationUrl}`, model); 
  }
  // login(model: AuthenticateDto) {
  //   return this.http
  //     .post(`${this.baseAuthenticationUrl}`, model)
  //     .pipe(map(
  //       (response: Result) => {
  //         const user = response;
  //         //this.decodeToken = this.jwtHelper.decodeToken(user.data.token);
  //         if (user.success) {
  //           localStorage.setItem('token', user.data.token);
  //           sessionStorage.setItem('username', this.decodeToken.unique_name);
  //         }else{
  //           console.log(user);
  //         }
  //       }, error => {
  //         console.log(error.error);
  //       })
  //     );
  // }

  logSession(token: string, username:string){
    localStorage.setItem('token', token);
    sessionStorage.setItem('username', username);
  }


  register(model: User): Observable<Result> {
    return this.http.post<Result>(`${this.userUrL}`, model); 
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}

