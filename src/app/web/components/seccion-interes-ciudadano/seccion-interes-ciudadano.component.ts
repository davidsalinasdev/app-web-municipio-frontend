import { Component, ElementRef, ViewChild } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { CiudadanoService } from '../../services/ciudadano.service';


const base_url = environment.base_url;




@Component({
  selector: 'app-seccion-interes-ciudadano',
  templateUrl: './seccion-interes-ciudadano.component.html',
  styleUrl: './seccion-interes-ciudadano.component.css'
})
export class SeccionInteresCiudadanoComponent {

  public baseUrl: string;
  public listCiudadano: any[] = [];
  public listInteres: any[] = [];
  public _album: any[] = [];


  constructor(
    private ciudadanoServices: CiudadanoService,

  ) {
    this.baseUrl = base_url;
  }

  ngOnInit(): void {
    this.indexJaku();
  }

  /**
   * indexJaku
   */
  public indexJaku() {
    this.ciudadanoServices.getCiudadano().subscribe(
      (resp: any) => {
        this.listCiudadano = resp.ciudadanotv;
        // console.log(this.listCiudadano);
      }
    )
  }

}
