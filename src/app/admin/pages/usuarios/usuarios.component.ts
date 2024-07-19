import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
// Servicios
import { UsuarioService } from './../../services/usuario/usuario.service';
// Modelos
import { Usuario } from '../../models/usuario';

//Servicio para comunicación entre componentes con observables
import { UsuarioSignalService } from './../../services/usuario/usuario-signal.service';
import { UsuarioUpdateSignalService } from './../../services/usuario/usuario-update-signal.service';

// jquery en angular
declare var $: any;



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public listaUsuarios: Usuario[] = [];
  public datosRecibidos: Usuario = {} as Usuario;

  private subscription!: Subscription;

  @ViewChild('myTableUsuario', { static: false }) table!: ElementRef;

  constructor(
    private usuarioService: UsuarioService,
    private usuarioSignalService: UsuarioSignalService,
    private usuarioUpdateSignalService: UsuarioUpdateSignalService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // Recibiendo datos del observable de usuarioSignalService
    this.subscription = this.usuarioSignalService.data$.subscribe((data) => {
      this.datosRecibidos = data;
      this.indexUsuarios();
    });
    this.indexUsuarios();
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
      $('#modal-agregar-usuario').modal('show');
      resolve(); // Resuelve la promesa cuando se muestra el modal
    });
  }

  // Método para cerrar el modal y eliminar instancias huérfanas de modal-backdrop
  public closeModal() {
    $('#modal-agregar-usuario').modal('hide');
    $('.modal-backdrop').remove(); // Eliminar cualquier instancia de modal-backdrop
  }

  /**
   * indexModal
   */
  public indexUsuarios() {

    this.usuarioService.index().subscribe({
      next: (resp: any) => {

        const { usuarios } = resp;

        this.listaUsuarios = usuarios;
        this.refreshDataTable();
      },
      error: (err) => {
        console.log('error');
      },
      complete: () => {
        // console.log('complete');
      }
    });
  }

  public showUsuario(id: number) {
    $('#modal-editar-usuario').modal('show');

    this.usuarioService.show(id).subscribe({
      next: (resp: any) => {
        const { usuario } = resp;

        // Emisión de de datos
        this.usuarioUpdateSignalService.sendDataUpdate(usuario);
      },
      error: (err) => {
        console.log('error');
      },
      complete: () => {
        // console.log('complete');
      }
    });
  }

  /**
   * deleteUsuario
   */
  public deleteUsuario(id: number) {
    this.usuarioService.delete(id).subscribe({
      next: (resp: any) => {
        const { status, message } = resp;
        if (status === 'success') {
          toastr.success(`${message}`, 'Web GAMDC');
          this.indexUsuarios();
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
    });
  }

  // Metodo dataTables
  private refreshDataTable() {
    const tableElement = this.table.nativeElement;

    if ($.fn.dataTable.isDataTable('#myTableUsuario')) {
      $('#myTableUsuario').DataTable().destroy();
    }

    $(document).ready(() => {
      $('#myTableUsuario').DataTable({
        data: this.listaUsuarios,
        columns: [
          { data: 'id' },
          { data: 'email' },
          {
            data: 'persona_id',
            render: (data: any, type: any, row: any) => {
              return row.persona.nombres + ' ' + row.persona.apellidos; // Asume que persona_id es una referencia al id de la persona
            }
          },
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
            data: null,
            render: (data: any, type: any, row: any) => {
              return `
                    <button class="btn btn-warning edit-btn" data-id="${row.id}" data-toggle="tooltip" data-placement="top" title="Modificar" >
                      <i class="fa fa-edit text-dark"></i>
                    </button>
                    <button class="btn btn-danger delete-btn" data-id="${row.id}" data-toggle="tooltip" data-placement="top" title="Deshabilitar">
                      <i class="fa fa-trash"></i>
                    </button>
                  `;
            }
          }
        ],
        order: [[0, 'desc']], // Ordenar por la primera columna ('id') de forma descendente
        language: {
          url: './../../../../assets/json/datatablespanish.json' // Ruta al archivo de localización en español
        }
      });

      // Eliminar cualquier controlador de eventos existente antes de agregar uno nuevo
      $(tableElement).off('click', '.edit-btn');

      // Vincular eventos click después de inicializar DataTable
      $(tableElement).on('click', '.edit-btn', (event: any) => {
        const id = $(event.currentTarget).data('id');
        this.showUsuario(id);
      });

      // Eliminar cualquier controlador de eventos existente antes de agregar uno nuevo
      $(tableElement).off('click', '.delete-btn');

      // Vincular eventos click después de inicializar DataTable
      $(tableElement).on('click', '.delete-btn', (event: any) => {
        const id = $(event.currentTarget).data('id');
        this.deleteUsuario(id);
      });
    });
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
    this.refreshDataTable();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}