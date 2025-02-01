import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { DataTableDirective } from 'angular-datatables';
import { Config } from "datatables.net";

// Servicios
import { SectorService } from '../../../services/mercados/sector.service';

// Modelos
import { SectorMercado } from '../../../models/sector-mercado';

//Servicio para comunicación entre componentes con observables
import { MercadoSignalSectorServices } from '../../../services/mercados/mercado-signals-sector.service';
import { MercadoUpdateSignalSectorService } from '../../../services/mercados/mercado-update-signal-sector.service';

// Para renderizar el Dom
import { Renderer2 } from '@angular/core'; // Importar Renderer2

// jquery en angular
declare var $: any;

@Component({
  selector: 'app-sector-mercado',
  templateUrl: './sector-mercado.component.html',
  styleUrl: './sector-mercado.component.css'
})
export class SectorMercadoComponent implements OnInit, OnDestroy {

  public listaSector: SectorMercado[] = [];

  public listaSectorMercado: SectorMercado[] = [];
  public datosRecibidos: SectorMercado = {} as SectorMercado;

  private subscription!: Subscription;


  // paginacion del lado del servidor
  public currentPage: number = 1;
  public totalItems: number = 0;
  public itemsPerPage: number = 5;
  public totalPages: number = 0;
  // FIN paginacion del lado del servidor

  // Angular-dataTables
  public dtOptions: Config = {};
  @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective;
  public dtTrigger: Subject<any> = new Subject();


  constructor(
    private sectorServices: SectorService,
    private mercadoSignalSectorServices: MercadoSignalSectorServices,
    private mercadoUpdateSignalSectorServices: MercadoUpdateSignalSectorService,
    private renderer: Renderer2 // Inyectar Renderer2
  ) { }


  ngOnInit(): void {
    // Recibiendo datos del observable de personaSignalServices
    this.subscription = this.mercadoSignalSectorServices.data$.subscribe((data) => {
      this.datosRecibidos = data;
      this.indexmejorado();
    });
    this.indexmejorado();
  }

  /**
   * indexmejorado
   */
  public indexmejorado() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json'
      },
      serverSide: true,
      ajax: (dataTablesParameters: any, callback) => {

        dataTablesParameters.search = dataTablesParameters.search.value;

        this.sectorServices.indexPost(dataTablesParameters).subscribe({

          next: (resp: any) => {

            const details = JSON.parse(JSON.stringify(resp));
            // console.log(details);
            callback({
              recordsTotal: details.recordsTotal,
              recordsFiltered: details.recordsFiltered,
              data: details.data,
            });
            // this.initTooltips(); // Inicializar tooltips después de cargar los datos
          },
          error: (err: any) => {
            console.log(err);
          },
          // complete: () => console.info('complete')
        })

      },

      columns: [
        // { data: null }, // Este será el índice de la fila
        { data: 'id' },
        { data: 'mercado' },
        { data: 'sector' },
        { data: 'descripcion' },
        {
          data: null,
          render: (data: any, type: any, row: any) => {
            if (row.estado === 1) {
              return `<span class="badge badge-success">Activo</span>`;
            } else {
              return `<span class="badge badge-danger">Inactivo</span>`;
            }
          }
        },
        {
          // Columna de acciones
          data: null,
          render: (data: any, type: any, row: any) => {
            return `
                    <button class="btn btn-warning sector-edit-btn" data-id="${row.id}" data-toggle="tooltip" data-placement="left" title="Modificar" >
                      <i class="fa fa-edit text-dark"></i>
                    </button>
                    <button class="btn btn-danger sector-delete-btn" data-id="${row.id}" data-toggle="tooltip" data-placement="left" title="Deshabilitar">
                      <i class="fa fa-trash"></i>
                    </button>
                  `;
          }
        }
      ],
      order: [[0, 'desc']], // Ordenar por la primera columna ('id') de forma descendente

      // columnDefs: [
      //   {
      //     targets: 0, // Primer columna (donde se enumerarán las filas)
      //     orderable: false,
      //     searchable: false,
      //     render: (data: any, type: any, row: any, meta: any) => {
      //       return meta.row + meta.settings._iDisplayStart + 1;
      //     }
      //   }
      // ],

      drawCallback: () => {

        // Remove previous listeners to avoid multiple bindings
        $(document).off('click', '.sector-delete-btn');
        $(document).off('click', '.sector-edit-btn');

        // Evento btn editar
        $(document).on('click', '.sector-edit-btn', (event: any) => {
          const id = $(event.currentTarget).data('id');
          this.showSector(id);
        });

        // Evento btn dar de baja
        $(document).on('click', '.sector-delete-btn', (event: any) => {
          const id = $(event.currentTarget).data('id');
          this.deleteSector(id);
        });
      }
    };
  }

  /**
   * btnModalAgregar
   */
  public async btnModalAgregar() {

    $('.modal-backdrop').remove(); // Eliminar cualquier instancia de modal-backdrop

    await this.mostrarModal(); // Espera a que se muestre el modal
    // Aquí puedes realizar otras acciones después de que se muestre el modal
  }

  private mostrarModal(): Promise<void> {
    return new Promise<void>((resolve) => {
      $('#modal-agregar-sector').modal('show');
      resolve(); // Resuelve la promesa cuando se muestra el modal
    });
  }

  // Método para cerrar el modal y eliminar instancias huérfanas de modal-backdrop
  public closeModal() {
    $('#modal-agregar-sector').modal('hide');
    $('.modal-backdrop').remove(); // Eliminar cualquier instancia de modal-backdrop
  }


  public showSector(id: number) {

    $('#modal-editar-sector').modal('show');

    this.sectorServices.show(id).subscribe({
      next: (resp: any) => {

        const { sector } = resp;

        // Emisión de de datos
        this.mercadoUpdateSignalSectorServices.sendDataUpdate(sector);

      },
      error: (err) => {
        console.log('error');
      },
      complete: () => {
        // console.log('complete');
      }
    })
  }

  /**
   * deletePersona
   */
  public deleteSector(id: number) {

    this.sectorServices.delete(id).subscribe({
      next: (resp: any) => {
        const { status, message } = resp;
        if (status === 'success') {
          toastr.success(`${message}`, 'Web GAMDC');

          // Después de una eliminación exitosa
          $('#myTableSector').DataTable().ajax.reload(null, false);
        } else {
          toastr.error(`Intente nuevamente`, 'Web GAMDC');
        }
      },
      error: (err) => {
        console.log('error');
      },
      complete: () => {
        // console.log('complete');
      }
    })
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    // Limpiar los eventos
    $(document).off('click', '.titular-edit-btn');
    $(document).off('click', '.titular-delete-btn');
    $(document).off('click', '.sector-edit-btn');
    $(document).off('click', '.sector-delete-btn');
  }

}
