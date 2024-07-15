import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Variables globales
import { environment } from '../../../environments/environment';

// Modelos
import { Persona } from '../models/persona';

// Asigno de variable global
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(
    private http: HttpClient
  ) { }


  /**
   * index
   */
  public index() {
    return this.http.get(`${base_url}/api/personas`);
  }


  /**
   * store
   */
  public store(formData: Persona) {

    return this.http.post(`${base_url}/api/personas`, formData);

  }

}
