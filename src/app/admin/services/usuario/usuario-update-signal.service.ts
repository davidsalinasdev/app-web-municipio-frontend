import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Usuario } from './../../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioUpdateSignalService {

  private dataSubjectUpdate = new Subject<Usuario>();

  dataUpdate$ = this.dataSubjectUpdate.asObservable();

  sendDataUpdate(data: Usuario) {
    this.dataSubjectUpdate.next(data);
  }
}
