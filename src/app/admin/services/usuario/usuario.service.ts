// Variables globales
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment';

// Modelos
import { Usuario } from '../../models/usuario';

// Asigno de variable global
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }


  /**
   * index
   */
  public index() {
    return this.http.get(`${base_url}/api/usuario`);
  }

  /**
   * store
   */
  public store(formData: Usuario) {

    return this.http.post(`${base_url}/api/usuario`, formData);
  }

  public show(id: number) {
    return this.http.get(`${base_url}/api/usuario/${id}`);
  }

  public update(formData: any, id: number) {
    return this.http.put(base_url + `/api/usuario/${id}`, formData);
  }

  public delete(id: number) {
    return this.http.delete(base_url + `/api/usuario/${id}`);
  }
}