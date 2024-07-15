import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
// Servicios
import { PersonaService } from '../../services/persona.service';
// Modelos
import { Persona } from '../../models/persona';

//Servicio para comunicación entre componentes con observables
import { PersonaSignalServices } from '../../services/persona-signals.service';



// jquery en angular
declare var $: any;

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrl: './persona.component.css'
})
export class PersonaComponent implements OnInit, OnDestroy {

  public listaPersonas: Persona[] = [];
  public datosRecibidos: Persona = {} as Persona;

  private subscription!: Subscription;

  constructor(
    private personaServices: PersonaService,
    private personaSignalServices: PersonaSignalServices,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    // Recibiendo datos del observable de personaSignalServices
    this.subscription = this.personaSignalServices.data$.subscribe((data) => {
      this.datosRecibidos = data;
      this.indexPersonas();
    });
    this.indexPersonas();

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
      $('#modal-agregar-persona').modal('show');
      resolve(); // Resuelve la promesa cuando se muestra el modal
    });
  }



  // Método para cerrar el modal y eliminar instancias huérfanas de modal-backdrop
  public closeModal() {
    $('#modal-agregar-persona').modal('hide');
    $('.modal-backdrop').remove(); // Eliminar cualquier instancia de modal-backdrop
  }


  /**
   * indexModal
   */
  public indexPersonas() {

    this.personaServices.index().subscribe({
      next: (resp: any) => {

        const { persona } = resp;
        this.listaPersonas = persona.data;
        this.refreshDataTable();

      },
      error: (err) => {
        console.log('error');
      },
      complete: () => {
        console.log('complete');
      }
    })

  }

  // Metodo dataTables
  private refreshDataTable() {
    if ($.fn.dataTable.isDataTable('#myTablePersona')) {
      $('#myTablePersona').DataTable().destroy();
    }
    $(document).ready(() => {
      $('#myTablePersona').DataTable({
        data: this.listaPersonas,
        columns: [
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
            defaultContent: `
            <button class="btn btn-warning" data-toggle="tooltip" data-placement="top" title="Modificar">
              <i class="fa fa-edit text-dark"></i>
            </button>
            <button class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Deshabilitar">
              <i class="fa fa-trash"></i>
            </button>
          `
          }
        ],
        order: [[0, 'desc']], // Ordenar por la primera columna ('id') de forma descendente
        language: {
          url: './../../../../assets/json/datatablespanish.json' // Ruta al archivo de localización en español
        }
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
