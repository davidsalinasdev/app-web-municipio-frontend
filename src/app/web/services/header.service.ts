import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


// Variables globales
import { environment } from '../../../environments/environment';

// Modelos
// import { Persona } from '../models/persona';

// Asigno de variable global
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HeaderService {


  constructor(
    private http: HttpClient
  ) { }


  /**
   * index
   */
  public indexCarrusel() {
    return this.http.get(`${base_url}/api/inicio/getBanners`);
  }

}
