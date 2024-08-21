
// data.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TitularPuesto } from '../../models/titular-puesto';

@Injectable({ providedIn: 'root' })

export class MercadoSignalServices {

  private dataSubject = new Subject<TitularPuesto>();

  data$ = this.dataSubject.asObservable();

  sendData(data: TitularPuesto) {
    this.dataSubject.next(data);
  }

}

