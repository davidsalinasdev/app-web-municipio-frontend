import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class GenerarCobroService {

  constructor(private http: HttpClient) { }

  /**
  * store
  */
  public storeCobro(data: any) {

    const user = localStorage.getItem('usuario');

    const { id } = JSON.parse(user!);

    const formData = {
      id: id,
      fecha_actual: data.fecha_actual
    };

    console.log(formData);


    return this.http.post(`${base_url}/api/generar-cobro`, formData);
  }
}
