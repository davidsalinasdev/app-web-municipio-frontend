import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { DataTableDirective } from 'angular-datatables';
import { Config } from "datatables.net";

// Servicios
import { PuestoService } from '../../../services/mercados/puesto.service';
import { SectorService } from '../../../services/mercados/sector.service';
import { TitularService } from '../../../services/mercados/titular.service';

// Modelos
import { PuestoMercado } from '../../../models/puesto-mercado';

//Servicio para comunicación entre componentes con observables
import { MercadoSignalPuestoService } from '../../../services/mercados/mercado-signals-puesto.service';
import { MercadoUpdateSignalPuestoService } from '../../../services/mercados/mercado-update-signal-puesto.service';
import { IndexSectorSignalService } from '../../../services/mercados/index-sector-signal.service';
import { IndexTitularSignalService } from '../../../services/mercados/index-titular-signal.service';


// jquery en angular
declare var $: any;

@Component({
  selector: 'app-puesto-mercado',
  templateUrl: './puesto-mercado.component.html',
  styleUrl: './puesto-mercado.component.css'
})
export class PuestoMercadoComponent implements OnInit, OnDestroy {

  public listaPuesto: PuestoMercado[] = [];

  public listaPuestoMercado: PuestoMercado[] = [];
  public datosRecibidos: PuestoMercado = {} as PuestoMercado;

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
    private puestoServices: PuestoService,
    private mercadoSignalPuestoServices: MercadoSignalPuestoService,
    private mercadoUpdateSignalPuestoServices: MercadoUpdateSignalPuestoService,
    private sectorServices: SectorService,
    private titularServices: TitularService,
    private indexSectorSignalServices: IndexSectorSignalService,
    private indexTitularSignalServices: IndexTitularSignalService
  ) { }


  ngOnInit(): void {
    // Recibiendo datos del observable de personaSignalServices
    this.subscription = this.mercadoSignalPuestoServices.data$.subscribe((data) => {
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

        this.puestoServices.indexPost(dataTablesParameters).subscribe({

          next: (resp: any) => {

            const details = JSON.parse(JSON.stringify(resp));

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
        { data: null }, // Este será el índice de la fila
        { data: 'nro_puesto' },
        // { data: 'titular_id' },
        {
          data: null,
          render(data, type, row, meta) {
            return data.titular.nombres + ' ' + data.titular.apellidos;
          },
        },
        { data: 'fecha_ingreso' },
        { data: 'nro_contrato' },
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
                    <button class="btn btn-warning puesto-edit-btn" data-id="${row.id}" data-toggle="tooltip" data-placement="left" title="Modificar" >
                      <i class="fa fa-edit text-dark"></i>
                    </button>
                      <button class="btn btn-info puesto-show-btn" data-id="${row.id}" data-toggle="tooltip" data-placement="left" title="Ver información" >
                      <i class="fa fa-eye text-white"></i>
                    </button>
                    <button class="btn btn-danger puesto-delete-btn" data-id="${row.id}" data-toggle="tooltip" data-placement="left" title="Deshabilitar">
                      <i class="fa fa-trash"></i>
                    </button>
                  `;
          }
        }
      ],
      order: [[1, 'desc']], // Ordenar por la primera columna ('id') de forma descendente
      columnDefs: [
        {
          targets: 0, // Primer columna (donde se enumerarán las filas)
          orderable: false,
          searchable: false,
          render: (data: any, type: any, row: any, meta: any) => {
            return meta.row + meta.settings._iDisplayStart + 1;
          }
        }
      ],

      drawCallback: () => {

        // Remove previous listeners to avoid multiple bindings
        $(document).off('click', '.puesto-edit-btn');
        $(document).off('click', '.puesto-show-btn');
        $(document).off('click', '.puesto-delete-btn');

        // Evento btn editar
        $(document).on('click', '.puesto-edit-btn', (event: any) => {
          const id = $(event.currentTarget).data('id');
          this.showPuesto(id);
        });

        // Evento btn ver datos
        $(document).on('click', '.puesto-show-btn', (event: any) => {
          const id = $(event.currentTarget).data('id');
          this.mostrarPuesto(id);
        });

        // Evento btn dar de baja
        $(document).on('click', '.puesto-delete-btn', (event: any) => {
          const id = $(event.currentTarget).data('id');
          this.deletePuesto(id);
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

    //  Carga y envio de datos al modal mediante el observable
    // SECTOR
    this.sectorServices.index().subscribe({

      next: (resp: any) => {

        const { sector } = resp;

        // Emisión de de datos al modal sector
        this.indexSectorSignalServices.sendData(sector);

      },
      error: (err) => {
        console.log('error');
      },

      complete: () => {
        // console.log('complete');
      }
    })

    // TITULAR
    this.titularServices.index().subscribe({
      next: (resp: any) => {

        const { titular } = resp;
        // Emisión de de datos al modal titular
        this.indexTitularSignalServices.sendData(titular);

      },
      error: (err) => {
        console.log('error');
      },
      complete: () => {
        // console.log('complete');
      }
    })

  }

  private mostrarModal(): Promise<void> {
    return new Promise<void>((resolve) => {
      $('#modal-agregar-puesto').modal('show');
      resolve(); // Resuelve la promesa cuando se muestra el modal
    });
  }

  // Método para cerrar el modal y eliminar instancias huérfanas de modal-backdrop
  public closeModal() {
    $('#modal-agregar-puesto').modal('hide');
    $('.modal-backdrop').remove(); // Eliminar cualquier instancia de modal-backdrop
  }


  public showPuesto(id: number) {

    $('#modal-editar-puesto').modal('show');

    this.puestoServices.show(id).subscribe({
      next: (resp: any) => {

        const { sector } = resp;

        // Emisión de de datos
        this.mercadoUpdateSignalPuestoServices.sendDataUpdate(sector);

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
   * mostrarPuesto
   */
  public mostrarPuesto(id: number) {
    console.log('prueba mostrar puesto');
  }

  /**
   * deletePersona
   */
  public deletePuesto(id: number) {

    this.puestoServices.delete(id).subscribe({
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

    $(document).off('click', '.puesto-edit-btn');
    $(document).off('click', '.puesto-show-btn');
    $(document).off('click', '.puesto-delete-btn');
  }

}

