
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { SectorMercado } from '../../models/sector-mercado';

@Injectable({ providedIn: 'root' })

export class MercadoSignalSectorServices {

  private dataSubject = new Subject<SectorMercado>();

  data$ = this.dataSubject.asObservable();

  // Titulares
  sendData(data: SectorMercado) {
    this.dataSubject.next(data);
  }


}

