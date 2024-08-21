

// data.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TitularPuesto } from '../../models/titular-puesto';

@Injectable({ providedIn: 'root' })

export class MercadoUpdateSignalService {

  private dataSubjectUpdate = new Subject<TitularPuesto>();

  dataUpdate$ = this.dataSubjectUpdate.asObservable();

  sendDataUpdate(data: TitularPuesto) {
    this.dataSubjectUpdate.next(data);
  }

}
