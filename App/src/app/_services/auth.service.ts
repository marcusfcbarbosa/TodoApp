import { Injectable } from '@angular/core';
import { Constantes } from '../utils/Constantes';
import { JwtHelperService } from "@auth0/angular-jwt";
import { LoginComponent } from '../user/login/login.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Result } from '../models/result';

@Injectable()
export class AuthService {

    baseUrl = Constantes.END_POINT_AUTHENTICATION;
    jwtHelper = new JwtHelperService();
    decodeToken: any;

    constructor(private http: HttpClient) { }

    login(model: any) {
        var data = this.http
            .post(`${this.baseUrl}`, model)
            .pipe(
                map(
                    (response: Result) => {
                        const user = response;
                        if(user.success){
                            localStorage.setItem('token',user.data.token);
                            this.decodeToken = this.jwtHelper.decodeToken(user.data.token);
                        }
                    }
                )
            );
    }

    register(model: any){
        return this.http.post(`${this.baseUrl}`, model);
    }
    
    loggedIn(){
        const token = localStorage.getItem('token');
        return !this.jwtHelper.isTokenExpired(token);
    }

}

