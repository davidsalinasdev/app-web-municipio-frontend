import { Component } from '@angular/core';
import { CiudadanoService } from '../../services/ciudadano.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrl: './navegacion.component.css'
})
export class NavegacionComponent {


  public listCiudadano: any[] = [];
  showMenuServicio = false; // Estado del menú
  showMenu = false; // Estado del menú
  constructor(private ciudadanoServices: CiudadanoService) {
    this.indexListCiudadano();
  }


  public indexListCiudadano() {
    this.ciudadanoServices.getCiudadano().subscribe(
      (resp: any) => {
        this.listCiudadano = resp.ciudadanotv;
      }
    )
  }
}
