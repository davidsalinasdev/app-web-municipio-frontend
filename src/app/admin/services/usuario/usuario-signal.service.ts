// data.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Usuario } from './../../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioSignalService {

  private dataSubject = new Subject<Usuario>();

  data$ = this.dataSubject.asObservable();

  sendData(data: Usuario) {
    this.dataSubject.next(data);
  }

}
