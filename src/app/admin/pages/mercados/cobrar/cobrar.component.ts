import { Component, ViewChild } from '@angular/core';

// DATATABLES
import { DataTableDirective } from 'angular-datatables';
import { Config } from "datatables.net";

// RXJS
import { Subject } from 'rxjs';
import { CobrarService } from '../../../services/mercados/cobrar.service';

@Component({
  selector: 'app-cobrar',
  templateUrl: './cobrar.component.html',
  styleUrl: './cobrar.component.css'
})
export class CobrarComponent {

  public reciboCarnet: string = '';
  public reciboPuesto: string = '';

  public listRecibos: any[] = [];

  // Angular-dataTables
  public dtOptions: Config = {};
  @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective;
  public dtTrigger: Subject<any> = new Subject();


  constructor(private cobrarServices: CobrarService) { }

  ngOnInit(): void {
    this.configDataTables();
  }


  // DataTables
  public configDataTables() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 100, // Mantener el valor por defecto en 100
      lengthMenu: [100], // No es necesario mostrar, pero puede ser útil tenerlo aquí para configuración futura
      processing: true,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json'
      },
      dom: 'tip', // Oculta el 'lengthMenu' (l) y la barra de búsqueda (f)
    };
  }

  /**
   * buscarRecibos
   */
  public buscarRecibosCarnet() {
    const formData = {
      tipo: 'carnet',
      carnet: this.reciboCarnet
    }
    this.cobrarServices.recibosCarnet(formData).subscribe({
      next: (resp: any) => {
        const { facturas, status } = resp;
        if (status === 'success') {
          this.listRecibos = facturas;
          toastr.success(`Tiene ${this.listRecibos.length} recibos pendientes`, 'Web GAMDC');
          console.log(this.listRecibos);
        }
      },
      error: (err) => {

        toastr.error(`No tiene recibos pendientes`, 'Web GAMDC');

        console.log(err);
      },
      complete: () => {
        // console.log('complete');
      }
    })
  }
  public buscarRecibosPuesto() {

    const formData = {
      tipo: 'puesto',
      puesto: this.reciboPuesto
    }

    this.cobrarServices.recibosPuesto(formData).subscribe({
      next: (resp: any) => {
        const { facturas, status } = resp;
        if (status === 'success') {
          this.listRecibos = facturas;
          toastr.success(`Tiene ${this.listRecibos.length} recibos pendientes`, 'Web GAMDC');
          console.log(this.listRecibos);
        }
      },
      error: (err) => {
        toastr.error(`No tiene recibos pendientes`, 'Web GAMDC');
        console.log(err);
      },
      complete: () => {
        // console.log('complete');
      }
    })

  }

  /**
   * borraCarnet
   */
  public borrarCarnet() {
    this.reciboCarnet = '';
  }

  /**
   * borrarPuesto
   */
  public borrarPuesto() {
    this.reciboPuesto = '';
  }


  /**
   * cobrarRecibos
   */
  // Método para cobrar recibos
  public cobrarRecibos() {
    const recibosSeleccionados = this.listRecibos.filter(recibo => recibo.selected);

    this.cobrarServices.generarRecibo(recibosSeleccionados).subscribe({
      next: (response: any) => {
        const file = new Blob([response], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);  // Abre el recibo PDF en una nueva pestaña
      },
      error: (err) => {
        toastr.error('Error al generar el recibo');
        console.error(err);
      }
    });
  }


}
