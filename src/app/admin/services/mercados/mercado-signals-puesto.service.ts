
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { PuestoMercado } from '../../models/puesto-mercado';

@Injectable({ providedIn: 'root' })

export class MercadoSignalPuestoService {

  private dataSubject = new Subject<PuestoMercado>();

  data$ = this.dataSubject.asObservable();

  // Titulares
  sendData(data: PuestoMercado) {
    this.dataSubject.next(data);
  }


}

