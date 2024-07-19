
// data.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Persona } from '../models/persona';

@Injectable({ providedIn: 'root' })

export class PersonaUpdateSignalService {

  private dataSubjectUpdate = new Subject<Persona>();

  dataUpdate$ = this.dataSubjectUpdate.asObservable();

  sendDataUpdate(data: Persona) {
    this.dataSubjectUpdate.next(data);
  }

}
