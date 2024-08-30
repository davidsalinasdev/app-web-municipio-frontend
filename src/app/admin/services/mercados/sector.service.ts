import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Variables globales
import { environment } from '../../../../environments/environment';

// Modelos
import { SectorMercado } from '../../models/sector-mercado';

// Asigno de variable global
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor(
    private http: HttpClient
  ) { }

  /**
    * index
    */
  public index() {
    return this.http.get(`${base_url}/api/mercado-sector`);
  }


  /**
   * indexPost
   */
  public indexPost(dataTablesParametros: any) {

    return this.http.post(`${base_url}/api/index-post/mercado-sector`, dataTablesParametros);
  }

  /**
   * store
   */
  public store(formData: SectorMercado) {
    return this.http.post(`${base_url}/api/mercado-sector`, formData);
  }

  public show(id: number) {
    return this.http.get(`${base_url}/api/mercado-sector/${id}`);
  }

  public update(formData: SectorMercado, id: number) {
    return this.http.put(base_url + `/api/mercado-sector/${id}`, formData);
  }

  public delete(id: number) {
    return this.http.delete(base_url + `/api/mercado-sector/${id}`);
  }

  public indexEstadoSectorMercado() {
    return this.http.get(`${base_url}/api/estado/mercado-sector`);
  }
}
