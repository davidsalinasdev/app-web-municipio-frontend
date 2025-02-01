import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CobrarService {

  constructor(private http: HttpClient) { }

  /**
  * recibos sin cobrar tipo carnet
  */
  public recibosCarnet(formData: any) {
    return this.http.post(`${base_url}/api/recibos-carnet`, formData);
  }

  /**
  * recibos sin cobrar tipo puesto
  */
  public recibosPuesto(formData: any) {
    return this.http.post(`${base_url}/api/recibos-puesto`, formData);
  }

  /**
  * Generar recibos
  */
  public generarRecibo(formData: any) {
    const token = this.getToken(); // Obtén el token desde el almacenamiento local

    // Define los encabezados, incluyendo el token de autorización
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.post(`${base_url}/api/generar-recibo`, formData, {
      headers: headers, // Aquí agregamos los encabezados personalizados
      responseType: 'blob' // Esto es importante para que Angular sepa que espera un archivo
    });
  }

  private getToken(): string | null {
    return localStorage.getItem('token'); // Obtén el token del almacenamiento local
  }

}
