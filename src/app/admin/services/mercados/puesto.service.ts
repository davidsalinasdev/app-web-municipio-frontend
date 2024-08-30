import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Variables globales
import { environment } from '../../../../environments/environment';

// Modelos
import { PuestoMercado } from '../../models/puesto-mercado';

// Asigno de variable global
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PuestoService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * indexPost
   */
  public indexPost(dataTablesParametros: any) {

    return this.http.post(`${base_url}/api/index-post/mercado-puesto`, dataTablesParametros);

  }

  /**
   * store
   */
  public store(formData: PuestoMercado) {
    return this.http.post(`${base_url}/api/mercado-puesto`, formData);
  }

  public show(id: number) {
    return this.http.get(`${base_url}/api/mercado-puesto/${id}`);
  }


  public update(formData: PuestoMercado, id: number) {
    return this.http.put(base_url + `/api/mercado-puesto/${id}`, formData);
  }

  public delete(id: number) {
    return this.http.delete(base_url + `/api/mercado-puesto/${id}`);
  }

  public indexEstadoSectorMercado() {
    return this.http.get(`${base_url}/api/estado/mercado-puesto`);
  }
}

