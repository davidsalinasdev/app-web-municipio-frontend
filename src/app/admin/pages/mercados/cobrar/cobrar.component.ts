import { Component, ViewChild } from '@angular/core';

// DATATABLES
import { DataTableDirective } from 'angular-datatables';
import { Config } from "datatables.net";

// RXJS
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cobrar',
  templateUrl: './cobrar.component.html',
  styleUrl: './cobrar.component.css'
})
export class CobrarComponent {

  public puestoCarnet: string = '';

  // Angular-dataTables
  public dtOptions: Config = {};
  @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective;
  public dtTrigger: Subject<any> = new Subject();


  constructor() {

  }

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
  public buscarRecibos() {
    console.log(this.puestoCarnet);

  }
}
