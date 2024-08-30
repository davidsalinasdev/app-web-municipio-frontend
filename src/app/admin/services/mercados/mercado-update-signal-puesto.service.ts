

// data.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PuestoMercado } from '../../models/puesto-mercado';


@Injectable({ providedIn: 'root' })

export class MercadoUpdateSignalPuestoService {

  private dataSubjectUpdate = new Subject<PuestoMercado>();

  dataUpdate$ = this.dataSubjectUpdate.asObservable();

  // Sector
  sendDataUpdate(data: PuestoMercado) {
    this.dataSubjectUpdate.next(data);
  }

}
