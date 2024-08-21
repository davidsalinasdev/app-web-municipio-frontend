
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

// Servicios
import { TitularService } from '../../../../services/mercados/titular.service';
import { MercadoSignalServices } from '../../../../services/mercados/mercado-signals.service';

import * as toastr from 'toastr'; // Importa Toastr
import { Subscription } from 'rxjs';
import { MercadoUpdateSignalService } from '../../../../services/mercados/mercado-update-signal.service';
import { TitularPuesto } from '../../../../models/titular-puesto';


// jquery en angular
declare var $: any;

@Component({
  selector: 'app-modal-titular',
  templateUrl: './modal-titular.component.html',
  styleUrl: './modal-titular.component.css'
})
export class ModalTitularComponent implements OnInit {


  // Formulario
  public formulario!: FormGroup;
  public formularioUpdate!: FormGroup;

  private subscription!: Subscription;

  public idPersona!: number;


  // Select
  public estados = [
    { value: 1, estado: 'Activo' },
    { value: 0, estado: 'Inactivo' }
  ];

  ngOnInit(): void {



    this.subscription = this.mercadoUpdateSignalServices.dataUpdate$.subscribe((data: any) => {

      this.idPersona = data.id!;

      this.formularioUpdate.setValue({
        nombresUpdate: data.nombres,
        apellidosUpdate: data.apellidos,
        carnetUpdate: data.carnet,
        estadoUpdate: Number(data.estado),
      });

    });

    this.crearFormulario();

    this.crearFormularioUpdate();
  }

  // Servicios con inyecion de depencencias
  constructor(
    private fb: FormBuilder,
    private titularServices: TitularService,
    private mercadoSignalServices: MercadoSignalServices,
    private mercadoUpdateSignalServices: MercadoUpdateSignalService,
  ) {

    // Configura las opciones predeterminadas de Toastr
    toastr.options.closeButton = true;
    toastr.options.progressBar = true;
    toastr.options.positionClass = 'toast-top-right';
  }


  public crearFormulario() {

    this.formulario = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      carnet: ['', Validators.required],
    })

  }

  // Validaciones para formulario
  get nombres() {
    return this.formulario.get('nombres');
  }
  get apellidos() {
    return this.formulario.get('apellidos');
  }

  get carnet() {
    return this.formulario.get('carnet');
  }

  public crearFormularioUpdate() {

    this.formularioUpdate = this.fb.group({
      nombresUpdate: ['', Validators.required],
      apellidosUpdate: ['', Validators.required],
      carnetUpdate: ['', Validators.required],
      estadoUpdate: ['', Validators.required]
    })

  }
  // Validaciones para formulario
  get nombresUpdate() {
    return this.formularioUpdate.get('nombresUpdate');
  }
  get apellidosUpdate() {
    return this.formularioUpdate.get('apellidosUpdate');
  }

  get carnetUpdate() {
    return this.formularioUpdate.get('carnetUpdate');
  }
  get estadoUpdate() {
    return this.formularioUpdate.get('estadoUpdate');
  }


  /**
   * submit
   */
  public submit(formDirective: FormGroupDirective) {

    const usuarioAuth = JSON.parse(localStorage.getItem('usuario')!);

    const formData: TitularPuesto = {
      nombres: this.formulario.value.nombres,
      apellidos: this.formulario.value.apellidos,
      carnet: this.formulario.value.carnet,
      usuario_id: usuarioAuth.id
    }

    this.titularServices.store(formData).subscribe({
      next: (resp: any) => {

        // Se recupera la persona creada de la respuesta
        const { status, persona, message } = resp;

        if (status === 'success') {

          // Después de una agregación exitosa
          $('#myTableTitulars').DataTable().ajax.reload(null, false);
          // Emisión de de datos
          this.mercadoSignalServices.sendData(persona);

          // Resetear formulario
          formDirective.resetForm();

          // Display a success toast, with a title
          // Configura opciones adicionales y muestra la notificación
          toastr.success(`Se registro correctamente`, 'Web GAMDC')

          // Cierra el modal
          $('#modal-agregar-titular').modal('hide');
        }
      },
      error: (err) => {
        toastr.error(`Intente nuevamente`, 'Web GAMDC')
        console.log('error');
      },
      complete: () => {
        console.log('complete');
      }
    })
  }


  /**
   * submitUodate
   */
  public submitUpdate(formDirectiveUpdate: FormGroupDirective) {

    const formData: TitularPuesto = {

      id: this.idPersona, // Se agrega el id de la persona
      nombres: this.formularioUpdate.value.nombresUpdate,
      apellidos: this.formularioUpdate.value.apellidosUpdate,
      carnet: this.formularioUpdate.value.carnetUpdate,
      estado: this.formularioUpdate.value.estadoUpdate

    }


    this.titularServices.update(formData, this.idPersona).subscribe({
      next: (resp: any) => {

        const { status, persona, message } = resp;

        if (status === 'success') {

          toastr.success(`Se actualizo correctamente`, 'Web GAMDC')
          $('#modal-editar-titular').modal('hide');

          // Emisión de de datos
          // Después de una eliminación exitosa
          $('#myTableTitulars').DataTable().ajax.reload(null, false);
          this.mercadoSignalServices.sendData(persona);

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

