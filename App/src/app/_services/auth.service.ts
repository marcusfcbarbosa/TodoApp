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

    baseUrl = Constantes.END_POINT_AUTHENTICATION;

    userUrL = Constantes.END_POINT_USER;

    jwtHelper = new JwtHelperService();
    decodeToken: any;

    constructor(private http: HttpClient) { }

    login(model: AuthenticateDto ) {
        console.warn(this.baseUrl);
        console.warn(model);
        return this.http
          .post(`${this.baseUrl}`, model)
          .pipe(map(
              (response: any) => {
              const user = response;
              if (user) {
                localStorage.setItem('token', user.token);
                this.decodeToken = this.jwtHelper.decodeToken(user.token);
                sessionStorage.setItem('username', this.decodeToken.unique_name);
              }
            }, error=>{
                
            })
          );
      }

    register(model: User): Observable<Result> {
        return this.http.post<Result>(`${this.userUrL}`, model);
    }

    loggedIn() {
        const token = localStorage.getItem('token');
        return !this.jwtHelper.isTokenExpired(token);
    }

}

