import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// Modelos
import { SectorMercado } from '../../models/sector-mercado';


@Injectable({
  providedIn: 'root'
})
export class IndexSectorSignalService {

  private dataSubject = new Subject<SectorMercado>();

  data$ = this.dataSubject.asObservable();

  sendData(data: SectorMercado) {
    this.dataSubject.next(data);
  }

}

