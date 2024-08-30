

// data.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SectorMercado } from '../../models/sector-mercado';


@Injectable({ providedIn: 'root' })

export class MercadoUpdateSignalSectorService {

  private dataSubjectUpdate = new Subject<SectorMercado>();


  dataUpdate$ = this.dataSubjectUpdate.asObservable();


  // Sector
  sendDataUpdate(data: SectorMercado) {
    this.dataSubjectUpdate.next(data);
  }


}
