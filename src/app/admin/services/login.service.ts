import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  constructor(
    private http: HttpClient
  ) { }


  // Para proteger ruta del administrador miestras no este logueado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  // FIN Para proteger ruta del administrador miestras no este logueado


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

  /**
   * logout
   */
  public logout() {
    //  Antes sin interceptores
    // let headers = new HttpHeaders();
    // headers = headers.set('Authorization', `Bearer ${this.getToken()}`); // Establece el encabezado Authorization
    // const options = { headers: headers };

    return this.http.get(`${base_url}/api/logout`);

  }

}
