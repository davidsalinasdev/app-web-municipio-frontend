import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Variables globales
import { environment } from '../../../../environments/environment';

// Modelos
import { TitularPuesto } from '../../models/titular-puesto';

// Asigno de variable global
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class TitularService {

  constructor(
    private http: HttpClient
  ) { }


  /**
   * indexPost
   */
  public indexPost(dataTablesParametros: any) {

    return this.http.post(`${base_url}/api/index-post/mercado-titular`, dataTablesParametros);
  }


  /**
   * store
   */
  public store(formData: TitularPuesto) {
    return this.http.post(`${base_url}/api/mercado-titular`, formData);
  }

  public show(id: number) {
    return this.http.get(`${base_url}/api/mercado-titular/${id}`);
  }

  public update(formData: TitularPuesto, id: number) {
    return this.http.put(base_url + `/api/mercado-titular/${id}`, formData);
  }

  public delete(id: number) {
    return this.http.delete(base_url + `/api/mercado-titular/${id}`);
  }

  public indexEstadoTitularPuesto() {
    return this.http.get(`${base_url}/api/estado/mercado-titular`);
  }

}
