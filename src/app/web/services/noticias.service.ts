import { Injectable } from '@angular/core';


import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }

  /**
  * index
  */
  public indexCarrusel() {
    return this.http.get(`${base_url}/api/noticia/getNoticiasInicio`);
  }
}