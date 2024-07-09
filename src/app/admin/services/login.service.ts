import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';


// Variables globales
import { environment } from './../../../environments/environment';
import { Login } from '../models/login';

// Variables globales
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // Inyeccion de dependencias
  constructor(private http: HttpClient) { }


  /**
   * Servicio para el login
   */
  public login(formData: Login) {
    return this.http.post(`${base_url}/api/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )
  }

}
