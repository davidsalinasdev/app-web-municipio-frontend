
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment';

// Modelos
import { SeccionNoticias } from '../../models/seccion-noticias';

@Injectable({
  providedIn: 'root'
})
export class SeccionNoticiasService {

  constructor(
    private http: HttpClient
  ) { }

}
