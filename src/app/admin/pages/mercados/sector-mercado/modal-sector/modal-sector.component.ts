
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

// Servicios
import { SectorService } from '../../../../services/mercados/sector.service';

import { MercadoSignalSectorServices } from '../../../../services/mercados/mercado-signals-sector.service';
import { MercadoUpdateSignalSectorService } from '../../../../services/mercados/mercado-update-signal-sector.service';

import * as toastr from 'toastr'; // Importa Toastr
import { Subscription } from 'rxjs';
import { SectorMercado } from '../../../../models/sector-mercado';

// jquery en angular
declare var $: any;

@Component({
  selector: 'app-modal-sector',
  templateUrl: './modal-sector.component.html',
  styleUrl: './modal-sector.component.css'
})
export class ModalSectorComponent implements OnInit {

  // Formulario
  public formulario!: FormGroup;
  public formularioUpdate!: FormGroup;

  private subscription!: Subscription;
  public idSector!: number;

  // Select
  public estados = [
    { value: 1, estado: 'Activo' },
    { value: 0, estado: 'Inactivo' }
  ];

  ngOnInit(): void {

    this.subscription = this.mercadoUpdateSignalSectorServices.dataUpdate$.subscribe((data: SectorMercado) => {

      this.idSector = data.id!;

      this.formularioUpdate.setValue({
        sectorUpdate: data.sector,
        descripcionUpdate: data.descripcion,
        estadoUpdate: Number(data.estado),
      });

    });

    this.crearFormulario();
    this.crearFormularioUpdate();

  }

  // Servicios con inyecion de depencencias
  constructor(
    private fb: FormBuilder,
    private sectorServices: SectorService,
    private mercadoSignalSectorServices: MercadoSignalSectorServices,
    private mercadoUpdateSignalSectorServices: MercadoUpdateSignalSectorService,
  ) {

    // Configura las opciones predeterminadas de Toastr
    toastr.options.closeButton = true;
    toastr.options.progressBar = true;
    toastr.options.positionClass = 'toast-top-right';
  }


  public crearFormulario() {

    this.formulario = this.fb.group({
      mercado: ['', Validators.required],
      sector: ['', Validators.required],
      descripcion: ['', Validators.required],
    })

  }

  // Validaciones para formulario
  get mercado() {
    return this.formulario.get('mercado');
  }
  get sector() {
    return this.formulario.get('sector');
  }
  get descripcion() {
    return this.formulario.get('descripcion');
  }

  public crearFormularioUpdate() {

    this.formularioUpdate = this.fb.group({
      mercadoUpdate: ['', Validators.required],
      sectorUpdate: ['', Validators.required],
      descripcionUpdate: ['', Validators.required],
      estadoUpdate: ['', Validators.required]
    })

  }
  // Validaciones para formulario
  get mercadoUpdate() {
    return this.formularioUpdate.get('mercadoUpdate');
  }
  get sectorUpdate() {
    return this.formularioUpdate.get('sectorUpdate');
  }
  get descripcionUpdate() {
    return this.formularioUpdate.get('descripcionUpdate');
  }
  get estadoUpdate() {
    return this.formularioUpdate.get('estadoUpdate');
  }


  /**
   * submit
   */
  public submit(formDirective: FormGroupDirective) {

    const usuarioAuth = JSON.parse(localStorage.getItem('usuario')!);

    const formData: SectorMercado = {
      mercado: this.formulario.value.mercado,
      sector: this.formulario.value.sector,
      descripcion: this.formulario.value.descripcion,
      usuario_id: usuarioAuth.id
    }

    // console.log(formData);


    this.sectorServices.store(formData).subscribe({
      next: (resp: any) => {

        // Se recupera la persona creada de la respuesta
        const { status, sector, message } = resp;

        if (status === 'success') {

          // Después de una agregación exitosa
          $('#myTableSector').DataTable().ajax.reload(null, false);
          // Emisión de de datos
          this.mercadoSignalSectorServices.sendData(sector);

          // Resetear formulario
          formDirective.resetForm();

          // Display a success toast, with a title
          // Configura opciones adicionales y muestra la notificación
          toastr.success(`Se registro correctamente`, 'Web GAMDC')

          // Cierra el modal
          $('#modal-agregar-sector').modal('hide');
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

    const formData: SectorMercado = {

      id: this.idSector, // Se agrega el id del sector
      mercado: this.formularioUpdate.value.mercadoUpdate,
      sector: this.formularioUpdate.value.sectorUpdate,
      descripcion: this.formularioUpdate.value.descripcionUpdate,
      estado: this.formularioUpdate.value.estadoUpdate

    }


    this.sectorServices.update(formData, this.idSector).subscribe({
      next: (resp: any) => {

        const { status, sector, message } = resp;

        if (status === 'success') {

          toastr.success(`Se actualizo correctamente`, 'Web GAMDC')
          $('#modal-editar-sector').modal('hide');

          // Emisión de de datos
          // Después de una eliminación exitosa
          $('#myTableSector').DataTable().ajax.reload(null, false);
          this.mercadoUpdateSignalSectorServices.sendDataUpdate(sector);

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
  }


}


