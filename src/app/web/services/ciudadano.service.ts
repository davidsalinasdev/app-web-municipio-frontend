import { Injectable } from '@angular/core';


import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CiudadanoService {

  constructor(private http: HttpClient) { }

  /**
  * index
  */
  public getCiudadano() {
    return this.http.get(`${base_url}/api/interes/ciudadano`);
  }

  /**
* index de tu interes
*/
  public getInteres() {
    return this.http.get(`${base_url}/api/interes/detuinteres`);
  }
}