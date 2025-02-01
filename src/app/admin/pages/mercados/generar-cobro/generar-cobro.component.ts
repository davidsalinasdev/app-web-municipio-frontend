import { Component } from '@angular/core';
import { GenerarCobroService } from '../../../services/mercados/generar-cobro.service';

import * as toastr from 'toastr'; // Importa Toastr

@Component({
  selector: 'app-generar-cobro',
  templateUrl: './generar-cobro.component.html',
  styleUrl: './generar-cobro.component.css'
})
export class GenerarCobroComponent {

  public fechaActual: string = '';
  public isLoading: boolean = false; // Variable para controlar el estado de carga

  constructor(private generarCobroServices: GenerarCobroService) {
    this.fechaActual = new Date().toISOString().split('T')[0];
    // Configura las opciones predeterminadas de Toastr
    toastr.options.closeButton = true;
    toastr.options.progressBar = true;
    toastr.options.positionClass = 'toast-top-right';
  }



  /**
  * generarCobro
  */
  public generarCobro() {
    this.isLoading = true; // Deshabilita el botón

    const data = {
      fecha_actual: this.fechaActual
    };

    this.generarCobroServices.storeCobro(data)
      .subscribe((resp: any) => {

        if (resp.status === 'success') {
          toastr.success(`El cobro se generó correctamente`, 'Web GAMDC');
        } else {
          toastr.error(`${resp.message}`, 'Web GAMDC');
        }

      }, (err) => {
        console.log(err);

        toastr.error("Ya se genero el cobro para este mes", 'Web GAMDC');
      }, () => {
        this.isLoading = false; // Habilita el botón cuando la respuesta llega
      });
  }
}
