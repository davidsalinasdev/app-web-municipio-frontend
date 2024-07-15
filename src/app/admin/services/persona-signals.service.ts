
// data.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Persona } from '../models/persona';

@Injectable({ providedIn: 'root' })

export class PersonaSignalServices {
  private dataSubject = new Subject<Persona>();

  data$ = this.dataSubject.asObservable();

  sendData(data: Persona) {
    this.dataSubject.next(data);
  }
}
