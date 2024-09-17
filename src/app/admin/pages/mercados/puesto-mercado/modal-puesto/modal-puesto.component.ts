
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

// Servicios
import { PuestoService } from '../../../../services/mercados/puesto.service';

// Modelos
import { SectorMercado } from '../../../../models/sector-mercado';
import { TitularPuesto } from '../../../../models/titular-puesto';

import { MercadoSignalPuestoService } from '../../../../services/mercados/mercado-signals-puesto.service';
import { MercadoUpdateSignalPuestoService } from '../../../../services/mercados/mercado-update-signal-puesto.service';

import * as toastr from 'toastr'; // Importa Toastr
import { Subscription } from 'rxjs';
import { PuestoMercado } from '../../../../models/puesto-mercado';
import { IndexSectorSignalService } from '../../../../services/mercados/index-sector-signal.service';
import { IndexTitularSignalService } from '../../../../services/mercados/index-titular-signal.service';
import { SectorService } from '../../../../services/mercados/sector.service';
import { TitularService } from '../../../../services/mercados/titular.service';

// jquery en angular
declare var $: any;

@Component({
  selector: 'app-modal-puesto',
  templateUrl: './modal-puesto.component.html',
  styleUrl: './modal-puesto.component.css'
})
export class ModalPuestoComponent implements OnInit {



  // Formulario
  public formulario!: FormGroup;
  public formularioUpdate!: FormGroup;

  // Para canccelar las suscripciones
  private subscription!: Subscription;
  private subscriptionSector!: Subscription;
  private subscriptionTitular!: Subscription;


  public idPuesto!: number;

  // Select
  public estados = [
    { value: 1, estado: 'Activo' },
    { value: 0, estado: 'Inactivo' }
  ];

  public indexSector: any = [];
  public indexTitular: any = [];


  // Servicios con inyecion de depencencias
  constructor(
    private fb: FormBuilder,
    private puestoServices: PuestoService,
    private mercadoSignalPuestoServices: MercadoSignalPuestoService,
    private mercadoUpdateSignalPuestoServices: MercadoUpdateSignalPuestoService,
    private indexSectorSignalServices: IndexSectorSignalService,
    private indexTitularSignalServices: IndexTitularSignalService,
    private sectorServices: SectorService,
    private titularServices: TitularService
  ) {
    this.crearFormulario();
    // Configura las opciones predeterminadas de Toastr
    toastr.options.closeButton = true;
    toastr.options.progressBar = true;
    toastr.options.positionClass = 'toast-top-right';

    this.recibirIndexSectorSignal();
    this.recibirIndexTitularSignal();
    this.selectUpdated();

    this.indexSectorTitular();

  }

  ngOnInit(): void {

    this.subscription = this.mercadoUpdateSignalPuestoServices.dataUpdate$.subscribe((data: PuestoMercado) => {


      this.idPuesto = data.id!;

      this.formularioUpdate.setValue({

        nro_puestoUpdate: data.nro_puesto,
        sector_id_update: data.sector_id,
        titular_id_update: data.titular_id,
        precio_mensualUpdate: data.precio_mensual,
        fecha_ingresoUpdate: data.fecha_ingreso,
        nro_contratoUpdate: data.nro_contrato,
        observacionesUpdate: data.observaciones,
        estadoUpdate: Number(data.estado)
      });
      $('#mercado-sector-update-select2').val(this.formularioUpdate.value.sector_id_update).trigger('change');
      $('#mercado-titular-update-select2').val(this.formularioUpdate.value.titular_id_update).trigger('change')
    });

    this.datePickerMaterial();
    this.crearFormularioUpdate();

  }

  ngAfterViewInit(): void {
    $('#mercado-sector-select2').select2({
      dropdownParent: $('#modal-agregar-puesto'),
      minimumResultsForSearch: 0
    }).on('change', (e: any) => {
      this.formulario.patchValue({
        sector_id: $(e.target).val()
      });
    });

    $('#mercado-titular-select2').select2({
      dropdownParent: $('#modal-agregar-puesto'),
      minimumResultsForSearch: 0
    }).on('change', (e: any) => {
      this.formulario.patchValue({
        titular_id: $(e.target).val()
      });
    });

    // UPDATE SELECT
    $('#mercado-sector-update-select2').select2({
      dropdownParent: $('#modal-editar-puesto'),
      minimumResultsForSearch: 0
    }).on('change', (e: any) => {
      this.formularioUpdate.patchValue({
        sector_id_update: $(e.target).val()
      });
    });

    $('#mercado-titular-update-select2').select2({
      dropdownParent: $('#modal-editar-puesto'),
      minimumResultsForSearch: 0
    }).on('change', (e: any) => {
      this.formularioUpdate.patchValue({
        titular_id_update: $(e.target).val()
      });
    });

  }


  private indexSectorTitular() {
    this.sectorServices.index().subscribe({

      next: (resp: any) => {

        const { sector } = resp;

        this.indexSector = sector;

      },
      error: (err) => {
        console.log('error');
      },

      complete: () => {
        // console.log('complete1');
      }
    })

    // TITULAR
    this.titularServices.index().subscribe({
      next: (resp: any) => {

        const { titular } = resp;
        this.indexTitular = titular;

      },
      error: (err) => {
        console.log('error');
      },
      complete: () => {
        // console.log('complete2');
      }
    })
  }

  /**
   * selectUpdated
   */
  public selectUpdated() {
    $('#mercado-titular-select2').val(this.formulario.value.titular_id).trigger('change');
    $('#mercado-sector-select2').val(this.formulario.value.sector_id).trigger('change');


  }


  /**
   * recibirIndexSectorSignal
   */
  public recibirIndexSectorSignal() {
    this.subscriptionSector = this.indexSectorSignalServices.data$.subscribe((data: SectorMercado) => {
      this.indexSector = data;
    })
  }

  /**
   * recibirIndextitularSignal
  */
  public recibirIndexTitularSignal() {
    this.subscriptionTitular = this.indexTitularSignalServices.data$.subscribe((data: TitularPuesto) => {
      this.indexTitular = data;
    })
  }




  // Crea el formulario
  public crearFormulario() {
    this.formulario = this.fb.group({
      nro_puesto: ['', Validators.required],
      sector_id: ['', Validators.required],
      titular_id: ['', Validators.required],
      precio_mensual: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]], // Permite hasta 2 decimales
      fecha_ingreso: ['', Validators.required],
      fecha_registro: ['', Validators.required],
      nro_contrato: ['', Validators.required],
      observaciones: [''],
    })
  }

  // Validaciones para formulario
  get nroPuesto() {
    return this.formulario.get('nro_puesto');
  }
  get sector() {
    return this.formulario.get('sector_id');
  }

  get titular() {
    return this.formulario.get('titular_id');
  }

  get precioMensual() {
    return this.formulario.get('precio_mensual');
  }

  get fechaIngreso() {
    return this.formulario.get('fecha_ingreso');
  }


  get nroContrato() {
    return this.formulario.get('nro_contrato');
  }

  get fechaRegistro() {
    return this.formulario.get('fecha_registro');
  }

  get observaciones() {
    return this.formulario.get('observaciones');
  }

  public crearFormularioUpdate() {

    this.formularioUpdate = this.fb.group({
      nro_puestoUpdate: ['', Validators.required],
      sector_id_update: ['', Validators.required],
      titular_id_update: ['', Validators.required],
      precio_mensualUpdate: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]], // Permite hasta 2 decimales
      fecha_ingresoUpdate: ['', Validators.required],
      nro_contratoUpdate: ['', Validators.required],
      observacionesUpdate: ['', Validators.required],
      estadoUpdate: ['', Validators.required]
    })

  }
  // Validaciones para formulario
  get nroPuestoUpdate() {
    return this.formularioUpdate.get('nro_puestoUpdate');
  }
  get sectorPuestoUpdate() {
    return this.formularioUpdate.get('sector_id_update');
  }

  get titularPuestoUpdate() {
    return this.formularioUpdate.get('titular_id_update');
  }

  get precioMensualUpdate() {
    return this.formularioUpdate.get('precio_mensualUpdate');
  }

  get fechaIngresoUpdate() {
    return this.formularioUpdate.get('fecha_ingresoUpdate');
  }

  get nroContratoUpdate() {
    return this.formularioUpdate.get('nro_contratoUpdate');
  }


  get observacionesUpdate() {
    return this.formularioUpdate.get('observacionesUpdate');
  }
  get estadoUpdate() {
    return this.formularioUpdate.get('estadoUpdate');
  }

  /**
   * submit
   */
  public submit(formDirective: FormGroupDirective) {

    // console.log(this.formulario.value);
    // return;
    const usuarioAuth = JSON.parse(localStorage.getItem('usuario')!);

    const formData: PuestoMercado = {
      nro_puesto: this.formulario.value.nro_puesto,
      sector_id: this.formulario.value.sector_id,
      titular_id: this.formulario.value.titular_id,
      usuario_id: usuarioAuth.id,
      precio_mensual: this.formulario.value.precio_mensual,
      fecha_ingreso: this.formulario.value.fecha_ingreso,
      fecha_registro: this.formulario.value.fecha_registro,
      nro_contrato: this.formulario.value.nro_contrato,
      observaciones: this.formulario.value.observaciones,
    }

    this.puestoServices.store(formData).subscribe({
      next: (resp: any) => {

        // Se recupera la persona creada de la respuesta
        const { status, sector, message } = resp;

        if (status === 'success') {

          // Después de una agregación exitosa
          $('#myTablePuesto').DataTable().ajax.reload(function () {
            // Aquí puedes forzar el orden si es necesario
            $('#myTablePuesto').DataTable().order([1, 'desc']).draw();
          }, false);


          // Emisión de de datos
          this.mercadoSignalPuestoServices.sendData(sector);

          // Resetear formulario
          formDirective.resetForm();
          // this.formulario.reset();  // Añade esta línea si no está ya
          $('#mercado-sector-select2').val(null).trigger('change');
          $('#mercado-titular-select2').val(null).trigger('change');

          // Display a success toast, with a title
          // Configura opciones adicionales y muestra la notificación
          toastr.success(`Se registro correctamente`, 'Web GAMDC')

          // Cierra el modal
          $('#modal-agregar-puesto').modal('hide');
        }
      },
      error: (err) => {
        toastr.error(`Intente nuevamente`, 'Web GAMDC')
        console.log('error');
      },
      complete: () => {
        // console.log('complete');
      }
    })
  }

  /**
   * submitUodate
   */
  public submitUpdate(formDirectiveUpdate: FormGroupDirective) {

    const usuarioAuth = JSON.parse(localStorage.getItem('usuario')!);

    const formData: PuestoMercado = {

      id: this.idPuesto, // Se agrega el id Puesto
      nro_puesto: this.formularioUpdate.value.nro_puestoUpdate,
      sector_id: this.formularioUpdate.value.sector_id_update,
      titular_id: this.formularioUpdate.value.titular_id_update,
      usuario_id: usuarioAuth.id,
      precio_mensual: this.formularioUpdate.value.precio_mensualUpdate,
      nro_contrato: this.formularioUpdate.value.nro_contratoUpdate,
      fecha_ingreso: this.formularioUpdate.value.fecha_ingresoUpdate,
      observaciones: this.formularioUpdate.value.observacionesUpdate,
      estado: this.formularioUpdate.value.estadoUpdate
    }

    this.puestoServices.update(formData, this.idPuesto).subscribe({
      next: (resp: any) => {

        const { status, puesto } = resp;

        // console.log(puesto);


        if (status === 'success') {
          toastr.success(`Se actualizo correctamente`, 'Web GAMDC')
          $('#modal-editar-puesto').modal('hide');
          // Emisión de de datos
          // Después de una eliminación exitosa
          $('#myTablePuesto').DataTable().ajax.reload(null, false);
          this.mercadoUpdateSignalPuestoServices.sendDataUpdate(puesto);
          formDirectiveUpdate.resetForm();
        }
      },
      error: (err) => {
        toastr.error(`Intente nuevamente`, 'Web GAMDC')
        console.log('error');
      },
      complete: () => {
        // console.log('complete');
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.subscriptionSector) {
      this.subscriptionSector.unsubscribe();
    }

    if (this.subscriptionTitular) {
      this.subscriptionTitular.unsubscribe();
    }

    // Destruir Select2
    $('#mercado-sector-select2').select2('destroy');
    $('#mercado-titular-select2').select2('destroy');
  }

  /**
   * datePickerMaterial
   */
  public datePickerMaterial() {
    // Configura el datepicker para que esté en español
    $('#fecha_ingreso').datepicker({
      language: 'es',
      autoclose: true
    }).on('changeDate', (e: any) => {
      this.formulario.patchValue({
        fecha_ingreso: e.format(0, "dd/mm/yyyy"),
      });
    });

    // Configura el datepicker para que esté en español
    // Datepicker para 'fecha_registro_puesto' con mes y año
    $('#fecha-registro-puesto').datepicker({
      language: 'es',
      autoclose: true,
      format: 'mm/yyyy',
      minViewMode: 1
    }).on('changeDate', (e: any) => {
      this.formulario.patchValue({
        fecha_registro: e.format(0, "mm/yyyy"),
      });
    });

  }

}

