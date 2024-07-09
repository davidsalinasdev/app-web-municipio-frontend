import { HttpInterceptorFn } from '@angular/common/http';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// INTERCEPTOR BASADO EN FUNCIONES


// Función para obtener el token
const getToken = (): string | null => {
  const infoToken = localStorage.getItem('access');
  if (infoToken) {
    const { token } = JSON.parse(infoToken);
    return token;
  }
  return null;
};


// Función para manejar errores
const manejarError = (error: HttpErrorResponse): Observable<never> => {

  console.log('Sucedió un error');
  console.log('Registrado en el log file');
  console.warn(error);

  return throwError(() => new Error(error.message));
};


// FUNCIÓN DE INTERCEPTOR BASADO EN FUNCIONES
export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  let headers = new HttpHeaders();
  const token = getToken();

  if (token) {
    headers = headers.set('token-usuario', token);
  } else {
    headers = headers.set('token-usuario', '');
  }

  const reqClone = req.clone({ headers });

  return next(reqClone).pipe(
    catchError(manejarError)
  );

};
