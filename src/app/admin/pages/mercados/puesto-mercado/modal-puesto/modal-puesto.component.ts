
import { Component, OnInit, ViewChild } from '@angular/core';
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

  ngOnInit(): void {

    this.subscription = this.mercadoUpdateSignalPuestoServices.dataUpdate$.subscribe((data: PuestoMercado) => {

      this.idPuesto = data.id!;

      this.formularioUpdate.setValue({

        nroPuestoUpdate: data.nro_puesto,
        sectorUpdate: data.sector_id,
        titularUpdate: data.titular_id,
        precioMensualUpdate: data.precio_mensual,
        fechaIngresoUpdate: data.fecha_ingreso,
        nroContratoUpdate: data.nro_contrato,
        observacionesUpdate: data.observaciones,
        estadoUpdate: Number(data.estado)

      });
    });

    this.datePickerMaterial();
    this.crearFormularioUpdate();

    this.initializeSelect2();
  }

  // Inicializar Select2
  initializeSelect2() {

    $('#mercado-sector-select2').select2();

    $('#mercado-titular-select2').select2();

  }


  // Servicios con inyecion de depencencias
  constructor(
    private fb: FormBuilder,
    private puestoServices: PuestoService,
    private mercadoSignalPuestoServices: MercadoSignalPuestoService,
    private mercadoUpdateSignalPuestoServices: MercadoUpdateSignalPuestoService,
    private indexSectorSignalServices: IndexSectorSignalService,
    private indexTitularSignalServices: IndexTitularSignalService
  ) {
    this.crearFormulario();
    // Configura las opciones predeterminadas de Toastr
    toastr.options.closeButton = true;
    toastr.options.progressBar = true;
    toastr.options.positionClass = 'toast-top-right';

    this.recibirIndexSectorSignal();
    this.recibirIndexTitularSignal();
  }



  /**
   * recibirIndexSectorSignal
   */
  public recibirIndexSectorSignal() {
    this.subscriptionSector = this.indexSectorSignalServices.data$.subscribe((data: SectorMercado) => {
      this.indexSector = data;
      this.updateSelect2();
    })
  }

  /**
   * recibirIndextitularSignal
  */
  public recibirIndexTitularSignal() {
    this.subscriptionTitular = this.indexTitularSignalServices.data$.subscribe((data: TitularPuesto) => {
      this.indexTitular = data;
      this.updateSelect2();
    })
  }

  public updateSelect2() {
    $('#mercado-sector-select2').val(this.formulario.value.sector_id).trigger('change');
    $('#mercado-titular-select2').val(this.formulario.value.titular_id).trigger('change');
  }



  // Crea el formulario
  public crearFormulario() {
    this.formulario = this.fb.group({
      nro_puesto: ['', Validators.required],
      sector_id: ['', Validators.required],
      titular_id: ['', Validators.required],
      precio_mensual: ['', Validators.required],
      fecha_ingreso: ['', Validators.required],
      nro_contrato: ['', Validators.required],
      observaciones: ['', Validators.required],
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

  get observaciones() {
    return this.formulario.get('observaciones');
  }

  public crearFormularioUpdate() {

    this.formularioUpdate = this.fb.group({
      nro_puestoUpdate: ['', Validators.required],
      sectorUpdate: ['', Validators.required],
      titularUpdate: ['', Validators.required],
      precio_mensualUpdate: ['', Validators.required],
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
  get sectorUpdate() {
    return this.formularioUpdate.get('sectorUpdate');
  }

  get titularUpdate() {
    return this.formularioUpdate.get('titularUpdate');
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

    const usuarioAuth = JSON.parse(localStorage.getItem('usuario')!);

    const formData: PuestoMercado = {
      nro_puesto: this.formulario.value.nro_puesto,
      sector_id: this.formulario.value.sector,
      titular_id: this.formulario.value.titular,
      usuario_id: usuarioAuth.id,
      precio_mensual: this.formulario.value.precio_mensual,
      fecha_ingreso: this.formulario.value.fecha_ingreso,
      nro_contrato: this.formulario.value.nro_contrato,
      observaciones: this.formulario.value.observaciones,
    }

    // console.log(formData);


    this.puestoServices.store(formData).subscribe({
      next: (resp: any) => {

        // Se recupera la persona creada de la respuesta
        const { status, sector, message } = resp;

        if (status === 'success') {

          // Después de una agregación exitosa
          $('#myTablePuesto').DataTable().ajax.reload(null, false);
          // Emisión de de datos
          this.mercadoSignalPuestoServices.sendData(sector);

          // Resetear formulario
          formDirective.resetForm();

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
      nro_puesto: this.formularioUpdate.value.nroPuestoUpdate,
      sector_id: this.formularioUpdate.value.sectorUpdate,
      titular_id: this.formularioUpdate.value.titularUpdate,
      usuario_id: usuarioAuth.id,
      precio_mensual: this.formularioUpdate.value.precioMensualUpdate,
      nro_contrato: this.formularioUpdate.value.nroContratoUpdate,
      fecha_ingreso: this.formularioUpdate.value.fechaIngresoUpdate,
      observaciones: this.formularioUpdate.value.observacionesUpdate,
      estado: this.formularioUpdate.value.estadoUpdate

    }


    this.puestoServices.update(formData, this.idPuesto).subscribe({
      next: (resp: any) => {

        const { status, sector, message } = resp;

        if (status === 'success') {
          toastr.success(`Se actualizo correctamente`, 'Web GAMDC')
          $('#modal-editar-puesto').modal('hide');
          // Emisión de de datos
          // Después de una eliminación exitosa
          $('#myTablePuesto').DataTable().ajax.reload(null, false);
          this.mercadoUpdateSignalPuestoServices.sendDataUpdate(sector);
          formDirectiveUpdate.resetForm();
        }
      },
      error: (err) => {
        toastr.error(`Intente nuevamente`, 'Web GAMDC')
        console.log('error');
      },
      complete: () => {
        console.log('complete');
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
    $('.mydatepicker, #datepicker').datepicker({
      language: 'es',
      autoclose: true
    }).on('changeDate', (e: any) => {
      this.formulario.patchValue({
        fecha_ingreso: e.format(0, "dd/mm/yyyy")
      });
    });
  }

}

