import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.getToken(); // Obtiene el token

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`); // Establece el encabezado Authorization
    }

    const reqClone = req.clone({ headers });
    return next.handle(reqClone).pipe(
      catchError(this.handleError) // Maneja errores
    );
  }

  private getToken(): string | null {
    const token = localStorage.getItem('token');
    // console.log(token); // Para propósitos de depuración
    return token;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    // Aquí puedes agregar más lógica para manejar errores específicos
    console.error('HTTP Error:', error.message); // Registro del error para propósitos de depuración
    return throwError(() => new Error(error.message));
  }
}
