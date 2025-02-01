
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { DataTableDirective } from 'angular-datatables';
import { Config } from "datatables.net";


// Servicios
import { TitularService } from '../../../services/mercados/titular.service';

// Modelos
import { TitularPuesto } from '../../../models/titular-puesto';

//Servicio para comunicación entre componentes con observables
import { MercadoSignalServices } from '../../../services/mercados/mercado-signals.service';
import { MercadoUpdateSignalService } from '../../../services/mercados/mercado-update-signal.service';


// Para renderizar el Dom
import { Renderer2 } from '@angular/core'; // Importar Renderer2

// jquery en angular
declare var $: any;

@Component({
  selector: 'app-persona',
  templateUrl: './titular-mercado.component.html',
  styleUrl: './titular-mercado.component.css'
})
export class TitularMercadoComponent implements OnInit, OnDestroy {

  public listaPersonas: TitularPuesto[] = [];

  public listaTitularPuestos: TitularPuesto[] = [];
  public datosRecibidos: TitularPuesto = {} as TitularPuesto;

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
    private titularServices: TitularService,
    private mercadoSignalServices: MercadoSignalServices,
    private mercadoUpdateSignalServices: MercadoUpdateSignalService,
    private renderer: Renderer2 // Inyectar Renderer2
  ) { }


  ngOnInit(): void {

    // Recibiendo datos del observable de personaSignalServices
    this.subscription = this.mercadoSignalServices.data$.subscribe((data) => {
      this.datosRecibidos = data;
      // this.indexPersona(this.currentPage);
      this.indexmejorado();
    });
    this.indexmejorado();
    // this.indexPersona(this.currentPage);
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

        this.titularServices.indexPost(dataTablesParameters).subscribe({

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
        // { data: null }, // Este será el índice de la fila
        { data: 'id' },
        { data: 'nombres' },
        { data: 'apellidos' },
        { data: 'carnet' },
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
                    <button class="btn btn-warning titular-edit-btn" data-id="${row.id}" data-toggle="tooltip" data-placement="left" title="Modificar" >
                      <i class="fa fa-edit text-dark"></i>
                    </button>
                    <button class="btn btn-danger titular-delete-btn" data-id="${row.id}" data-toggle="tooltip" data-placement="left" title="Deshabilitar">
                      <i class="fa fa-trash"></i>
                    </button>
                  `;
          }
        }
      ],
      order: [[1, 'desc']], // Ordenar por la primera columna ('id') de forma descendente

      // Esto enumera las filas de la tabla
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
        $(document).off('click', '.titular-delete-btn');
        $(document).off('click', '.titular-edit-btn');

        // Evento btn editar
        $(document).on('click', '.titular-edit-btn', (event: any) => {
          const id = $(event.currentTarget).data('id');
          this.showPersona(id);
        });

        // Evento btn dar de baja
        $(document).on('click', '.titular-delete-btn', (event: any) => {
          const id = $(event.currentTarget).data('id');
          this.deletePersona(id);
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
      $('#modal-agregar-titular').modal('show');
      resolve(); // Resuelve la promesa cuando se muestra el modal
    });
  }



  // Método para cerrar el modal y eliminar instancias huérfanas de modal-backdrop
  public closeModal() {
    $('#modal-agregar-titular').modal('hide');
    $('.modal-backdrop').remove(); // Eliminar cualquier instancia de modal-backdrop
  }



  public showPersona(id: number) {

    $('#modal-editar-titular').modal('show');

    this.titularServices.show(id).subscribe({
      next: (resp: any) => {
        const { titular } = resp;
        // Emisión de de datos
        this.mercadoUpdateSignalServices.sendDataUpdate(titular);
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
  public deletePersona(id: number) {
    this.titularServices.delete(id).subscribe({
      next: (resp: any) => {
        const { status, message } = resp;
        if (status === 'success') {
          toastr.success(`${message}`, 'Web GAMDC');

          // Después de una eliminación exitosa
          $('#myTableTitulars').DataTable().ajax.reload(null, false);
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

